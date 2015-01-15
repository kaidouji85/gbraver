//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../server.js');
    var testCompleter = require('./testCompleter.js');
    var dbMock = require('./dbMock.js')();

    var app;
    var option;
    var Server;
    var roomId = 1;

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app,
            dao : dbMock
        });
    });

    afterEach(function() {
        app.close();
    });

    describe('戦闘ロジック#パイロットスキル', function() {
        it('パイロットスキル発動後にアタックコマンドフェイズに遷移する', function(done) {
            var client1 = io.connect(SERVER_URL, option);
            var client2 = io.connect(SERVER_URL, option);
            var tc = testCompleter({done:done});

            //***************************
            // ユーザ認証
            //***************************
            doAuth_client1();
            doAuth_client2();

            function doAuth_client1() {
                client1.emit('auth',{
                    userId : 'test004@gmail.com'
                });
                client1.once('successAuth',function(){
                    enterRoom_Client1();
                });
            }

            function doAuth_client2() {
                client2.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client2.once('successAuth',function(){
                    enterRoom_Client2();
                });
            }

            //***************************
            // ルームに入る
            //***************************
            function enterRoom_Client1(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom', function() {
                    client1.once('gameStart', function() {
                        doGameStart_Client1();
                    });
                });
            }

            function enterRoom_Client2(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom', function() {
                    client2.once('gameStart', function() {
                        doGameStart_Client2();
                    });
                });
            }

            //***************************
            // ゲームスタート
            //***************************
            function doGameStart_Client1() {
                client1.emit('command', {
                    method : 'ready'
                });
                client1.once('resp', doWaitPhase1_Client1);
            }

            function doGameStart_Client2() {
                client2.emit('command', {
                    method : 'ready'
                });
                client2.once('resp', doWaitPhase1_Client2);
            }

            //***************************
            // ウェイトフェイズ1
            //***************************
            function doWaitPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase1_Client1);
            }

            function doWaitPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase1_Client2);
            }

            //***************************
            // アタックコマンドフェイズ1
            //***************************
            function doAtackCommandPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client1.once('resp', doDefenseCommandPhase1_client1);
            }

            function doAtackCommandPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDefenseCommandPhase1_client2);
            }

            //***************************
            // ディフェンスコマンドフェイズ1
            //***************************
            function doDefenseCommandPhase1_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamgePhase1_client1);
            }

            function doDefenseCommandPhase1_client2(data) {
                client2.emit('command', {
                    method : 'defenth',
                    param : {
                        battery : 2
                    }
                });
                client2.once('resp', doDamgePhase1_client2);
            }

            //***************************
            // ダメージフェイズ1
            //***************************
            function doDamgePhase1_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_client1);
            }

            function doDamgePhase1_client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_client2);
            }

            //***************************
            // ウェイトフェイズ2
            //***************************
            function assertOfWaitPhase2(data) {
                var expect = {
                    phase : 'wait',
                    atackUserId : 'test004@gmail.com',
                    turn : 5,
                    statusArray : {
                        'test004@gmail.com' : {
                            hp : 3200,
                            battery : 3,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 3100,
                            battery : 3,
                            active : 3000,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(expect,data,'ウェイトフェイズ2のデータが正しい');
            }

            function doWaitPhase2_client1(data) {
                assertOfWaitPhase2(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAttackCommandPhase2_client1);
            }

            function doWaitPhase2_client2(data) {
                assertOfWaitPhase2(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAttackCommandPhase2_client2);
            }

            //***************************
            // アタックコマンドフェイズ1
            //***************************
            function assertOfAtackCommandPhase2(data) {
                var expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        'test004@gmail.com' : {
                            hp : 3200,
                            battery : 3,
                            active : 5000,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 3100,
                            battery : 3,
                            active : 3000,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function doAttackCommandPhase2_client1(data) {
                assertOfAtackCommandPhase2(data);
                client1.emit('command', {
                    method : 'pilotSkill'
                });
                client1.once('resp', doPilotSkillPhase_client1);
            }

            function doAttackCommandPhase2_client2(data) {
                assertOfAtackCommandPhase2(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doPilotSkillPhase_client2);
            }

            //***************************
            // パイロットスキル発動
            //***************************
            function assertOfPilotSkillPhase(data) {
                var expect = {
                    phase : 'pilotSkill',
                    statusArray : {
                        'test004@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000,
                            skillPoint : 0,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 3100,
                            battery : 3,
                            active : 3000,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(expect,data,"パイロットスキルフェイズのデータが正しい");
            }

            function doPilotSkillPhase_client1(data) {
                assertOfPilotSkillPhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAttackCommandPhase3_client1);
            }

            function doPilotSkillPhase_client2(data) {
                assertOfPilotSkillPhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAttackCommandPhase3_client2);
            }

            //***************************
            // アタックコマンドフェイズ3
            //***************************
            function assertOfAttackCommandPhase3(data) {
                var expect = {
                    phase: 'atackCommand',
                    statusArray: {
                        'test004@gmail.com': {
                            hp: 3200,
                            battery: 5,
                            active: 5000,
                            skillPoint: 0,
                            overHeatFlag : false
                        },
                        'test002@gmail.com': {
                            hp: 3100,
                            battery: 3,
                            active: 3000,
                            skillPoint: 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(expect,data,"アタックコマンドフェイズ2のデータが正しい");
            }

            function doAttackCommandPhase3_client1(data) {
                assertOfAttackCommandPhase3(data);
                tc.completeClient('test004@gmail.com');
            }

            function doAttackCommandPhase3_client2(data) {
                assertOfAttackCommandPhase3(data);
                tc.completeClient('test002@gmail.com');
            }
        });
    });
});
