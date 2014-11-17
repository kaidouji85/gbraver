//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testEnemyRoutineDefine = require('./testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../server.js');
    var dbMock = require('./dbMock.js')();

    var app;
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app
        });
        testServer.onGetUserData(dbMock.getUserData);
        testServer.onGetPlayerData(dbMock.getPlayerData);
        testServer.onGetCharacterInfo(dbMock.getArmdozerData);
        testServer.onGetEnemyData(dbMock.getEnemyData);
        testServer.onGetAttackRoutine(testEnemyRoutineDefine.getAttackRoutine);
    });

    afterEach(function() {
        app.close();
    });

    describe(' 一人用モード戦闘',function(){
        it('敵防御思考ルーチンに現在のステータスが渡される',function(done){

            initTestServer();
            initClient();

            function initTestServer() {
                testServer.onGetDefenseRoutine(function(routineId){
                    return dummyEnemyDefenseRoutine;
                });

                function dummyEnemyDefenseRoutine(statusArray) {
                    assertOfStatusArray(statusArray);
                    var command = {
                        method : 'defenth',
                        param : {
                            battery : 0
                        }
                    };
                    return command;
                }

                function assertOfStatusArray(statusArray){
                    var expect = {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1
                        },
                        'nonePlayerCharacter' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000,
                            skillPoint : 1
                        }
                    };
                    assert.deepEqual(expect,statusArray,'現在のステータスが敵防御思考ルーチンに渡される');
                }
            }

            function initClient(){
                var client = io(SERVER_URL, option);
                client.on('connect',doAuth);

                function doAuth() {
                    client.emit('auth',{
                        userId : 'test001@gmail.com'
                    });
                    client.once('successAuth',startSinglePlay);
                }

                function startSinglePlay() {
                    client.emit('startSinglePlay',{
                        enemyId : 'landozer',
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
                        method : 'atack',
                        param : {
                            battery : 3
                        }
                    });
                    client.once('resp',defenseCommandPhase);
                }

                function defenseCommandPhase(data) {
                    client.emit('command',{
                        method : 'ok'
                    });
                    client.once('resp',damagePhase);
                }

                function damagePhase(data) {
                    done();
                }
            }
        });
    });
});