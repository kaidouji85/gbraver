//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../../server/server.js');
    var testCompleter = require('./../testData/testCompleter.js');
    var dbMock = require('./../testData/dbMock.js')();

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

    describe('戦闘ロジック#攻撃・防御を一通り', function() {
        it('攻撃、防御バッテリーを決定してダメージ計算結果を受け取り、再びウェイトフェイズに遷移する', function(done) {
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
                    userId : 'test001@gmail.com'
                });
                client1.once('successAuth',enterRoom_Client1);
            }

            function doAuth_client2() {
                client2.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client2.once('successAuth',enterRoom_Client2);
            }

            //***************************
            // 入室
            //***************************
            function enterRoom_Client1(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom', function() {
                    client1.once('gameStart', doGameStart_Client1);
                });
            }

            function enterRoom_Client2(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom', function() {
                    client2.once('gameStart', doGameStart_Client2);
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
            function assertOfWaitPhase1(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : 'test001@gmail.com',
                    turn : 10,
                    statusArray : {
                        'test001@gmail.com' : {
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
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズ#1のレスポンスオブジェクトが正しい');
            }

            function doWaitPhase1_Client1(data) {
                assertOfWaitPhase1(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase_Client1);
            }

            function doWaitPhase1_Client2(data) {
                assertOfWaitPhase1(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase_Client2);
            }

            //***************************
            // アタックコマンドフェイズ
            //***************************
            function assertOfAtackCommandPhase(data) {
                expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        'test001@gmail.com' : {
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
                    }
                };
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function doAtackCommandPhase_Client1(data) {
                assertOfAtackCommandPhase(data);
                client1.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client1.once('resp', doDefenthCommandPhase_Client1);
            }

            function doAtackCommandPhase_Client2(data) {
                assertOfAtackCommandPhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDefenthCommandPhase_Client2);
            }

            //***************************
            // ディフェンスコマンドフェイズ
            //***************************
            function assertOfDefenthCommandPhase(data) {
                expect = {
                    phase : 'defenthCommand',
                    statusArray : {
                        'test001@gmail.com' : {
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
                    }
                };
                assert.deepEqual(data, expect, 'ディフェンスコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function doDefenthCommandPhase_Client1(data) {
                assertOfDefenthCommandPhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamagePhase_Client1);
            }

            function doDefenthCommandPhase_Client2(data) {
                assertOfDefenthCommandPhase(data);
                client2.emit('command', {
                    method : 'defenth',
                    param : {
                        battery : 2
                    }
                });
                client2.once('resp', doDamagePhase_Client2);
            }

            //***************************
            // ダメージフェイズ
            //***************************
            function assertOfDamagePhase(data) {
                expect = {
                    phase : 'damage',
                    hit : 1,
                    damage : 1920,
                    atackBattery : 3,
                    defenthBattery : 2,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 2,
                            active : 0,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 2780,
                            battery : 3,
                            active : 3000,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ダメーフェイズのレスポンスオブジェクトが正しい');
            }

            function doDamagePhase_Client1(data) {
                assertOfDamagePhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_Client1);
            }

            function doDamagePhase_Client2(data) {
                assertOfDamagePhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_Client2);
            }

            //***************************
            // ウェイトフェイズ2
            //***************************
            function assertOfWaitPhase2(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : 'test002@gmail.com',
                    turn : 7,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 2,
                            active : 3500,
                            skillPoint : 1,
                            overHeatFlag : false
                        },
                        'test002@gmail.com' : {
                            hp : 2780,
                            battery : 4,
                            active : 5100,
                            skillPoint : 1,
                            overHeatFlag : false
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズ#2のレスポンスオブジェクトが正しい');
            }

            function doWaitPhase2_Client1(data) {
                assertOfWaitPhase2(data);
                tc.completeClient('test001@gmail.com');
            }

            function doWaitPhase2_Client2(data) {
                assertOfWaitPhase2(data);
                tc.completeClient('test002@gmail.com');
            }
        });
    });
});
