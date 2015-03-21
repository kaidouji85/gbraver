//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('一人用戦闘モード終了', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testEnemyRoutineDefine = require('./../testData/testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../../server/server.js');
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
        it('プレイヤーが攻撃してゲームが終了する',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test003@gmail.com'
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
                var expect = {
                    phase : 'wait',
                    atackUserId : 'test003@gmail.com',
                    turn : 5,
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'nonePlayerCharacter' : {
                            hp : 4700,
                            battery : 5,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data,expect,'ウェイトフェイズの情報が正しい');
                sendWaitPhaseCommand();
            }

            function sendWaitPhaseCommand(){
                client.emit('command',{
                    method : 'ok'
                });
                client.once('resp',attackCommandPhase);
            }

            function attackCommandPhase(data) {
                var expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'nonePlayerCharacter' : {
                            hp : 4700,
                            battery : 5,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(expect,data,'アタックフェイズのデータが正しい');
                sendAtacckCommand();
            }

            function sendAtacckCommand() {
                client.emit('command',{
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client.once('resp',defenseCommandPhase);
            }

            function defenseCommandPhase(data) {
                var expect = {
                    phase : 'defenthCommand',
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'nonePlayerCharacter' : {
                            hp : 4700,
                            battery : 5,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data,expect,'ディフェンスコマンドフェイズのデータが正しい');
                sendDefenseCommand();
            }

            function sendDefenseCommand() {
                client.emit('command',{
                    method : 'ok'
                });
                client.once('resp',damagePhase);

            }

            function damagePhase(data) {
                var expect = {
                    phase : 'damage',
                    hit : 4,
                    damage : 16000,
                    atackBattery : 3,
                    defenthBattery : 0,
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 2,
                            active : 0,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'nonePlayerCharacter' : {
                            hp : -11300,
                            battery : 5,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data,expect,'ダメージフェイズのデータが正しい');
                sendDamagePhaseCommand();
            }

            function sendDamagePhaseCommand() {
                client.emit('command',{
                    method : 'ok'
                });
                client.once('resp',gameEnd);
            }

            function gameEnd(data){
                var expect = {
                    phase : 'gameEnd',
                    winner : 'test003@gmail.com',
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 2,
                            active : 0,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'nonePlayerCharacter' : {
                            hp : -11300,
                            battery : 5,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(expect,data,'ゲーム終了フェイズのデータが正しい');
                dissolveRoom();
            }

            function dissolveRoom(){
                client.emit('command', {
                    method : 'ok'
                });
                client.once('dissolveRoom', function(){
                    done();
                });
            }
        });
    });
});