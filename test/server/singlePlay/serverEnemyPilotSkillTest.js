//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testEnemyRoutineDefine = require('./../testData/testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../../../server/server.js');
    var dbMock = require('./../testData/dbMock.js')();

    var app;
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
        testServer.onGetAttackRoutine(testEnemyRoutineDefine.getAttackRoutine);
        testServer.onGetDefenseRoutine(testEnemyRoutineDefine.getDefenseRoutine);
    });

    afterEach(function() {
        app.close();
    });

    describe(' 一人用モード戦闘',function(){
        it('敵がパイロットスキルを発動する',function(done){
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
                    enemyId : 'saikyouBraver',
                    pilotId : 'kyoko',
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
                client.once('resp',assertOfPilotSkillPhaseData);
            }

            function assertOfPilotSkillPhaseData(data) {
                var expect = {
                    phase: 'atackCommand',
                    statusArray: {
                        'test001@gmail.com': {
                            hp: 3200,
                            active: 2500,
                            battery: 5,
                            skillPoint: 1,
                            overHeatFlag: false,
                            specialPoint : 0},
                        nonePlayerCharacter: {
                            hp: 4700,
                            active: 5000,
                            battery: 5,
                            skillPoint: 1,
                            overHeatFlag: false,
                            specialPoint : 0}}
                };
                assert.deepEqual(data,expect,'パイロットスキル発動フェイズのデータが正しい');
                doPilotSkillPhase();
            }

            function doPilotSkillPhase() {

                client.emit('command',{
                    method : 'ok'
                });
                client.once('resp',waitPhase2);
            }

            function waitPhase2(data) {
                done();
            }
        });
    });
});