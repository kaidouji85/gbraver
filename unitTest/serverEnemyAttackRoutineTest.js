//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testEnemyRoutineDefine = require('./testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var dbMock = require('./dbMock.js')();

    var app;
    var server = require('../server.js');
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app,
            dao : dbMock
        });
        testServer.onGetDefenseRoutine(testEnemyRoutineDefine.getDefenseRoutine);
    });

    afterEach(function() {
        app.close();
    });

    describe(' 一人用モード戦闘',function(){
        it('敵攻撃思考ルーチンに現在のステータスが渡される',function(done){

            initTestServer();
            initClient();

            function initTestServer() {
                testServer.onGetAttackRoutine(function(routineId){
                    return dummyEnemyAttackRoutine;
                });

                function dummyEnemyAttackRoutine(statusArray) {
                    assertOfStatusArray(statusArray);
                    var command = {
                        method : 'atack',
                        param : {
                            battery : 0
                        }
                    };
                    return command;
                }

                function assertOfStatusArray(statusArray){
                    var expect = {
                        'nonePlayerCharacter' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    };
                    assert.deepEqual(expect,statusArray,'現在のステータスが敵攻撃思考ルーチンに渡される');
                }
            }

            function initClient(){
                var client = io(SERVER_URL, option);
                client.on('connect',doAuth);

                function doAuth() {
                    client.emit('auth',{
                        userId : 'test002@gmail.com'
                    });
                    client.once('successAuth',startSinglePlay);
                }

                function startSinglePlay() {
                    client.emit('startSinglePlay',{
                        enemyId : 'granBraver',
                        routineId : 'zero'
                    });
                    client.once('gameStart',gameStart);
                }

                function gameStart(){
                    client.emit('command',{
                        method : 'ready'
                    });
                    client.once('resp',waitPhase);
                }

                function waitPhase(data){
                    client.emit('command',{
                        method : 'ok'
                    });
                    client.once('resp',attackCommandPhase);
                }

                function attackCommandPhase(data) {
                    client.emit('command',{
                        method : 'ok'
                    });
                    client.once('resp',defenseCommandPhase);
                }

                function defenseCommandPhase(data) {
                    done();
                }
            }
        });
    });
});