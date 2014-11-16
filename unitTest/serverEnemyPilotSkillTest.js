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
        testServer.onGetAttackRoutine(testEnemyRoutineDefine.getAttackRoutine);
        testServer.onGetDefenseRoutine(testEnemyRoutineDefine.getDefenseRoutine);
    });

    afterEach(function() {
        app.close();
    });

    describe(' 一人用モード戦闘',function(){
        it('プレイヤーがパイロットスキルを発動する',function(done){
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
                    method : 'pilotSkill'
                });
                client.once('resp',pilotSkillPhase);
            }

            function pilotSkillPhase(data) {
                client.emit('command',{
                    method : 'ok'
                });
                client.once('resp',attackCommandPhase2);
            }

            function attackCommandPhase2(data) {
                done();
            }
        });
    });
});