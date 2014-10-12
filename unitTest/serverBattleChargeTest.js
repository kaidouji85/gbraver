//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = 5000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');
    var testCompleter = require('./testCompleter.js');

    var option;
    var Server;
    var roomId = -1;

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });
        roomId = 0;
        Server.onGetPlayerData(testPlayerData.getPlayerData);
    });

    afterEach(function() {
        app.close();
    });

    describe('戦闘ロジック#チャージ', function() {
        it('チャージコマンドを実行してウェイトフェイズに遷移する', function(done) {
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
                client1.once('successAuth',function(){
                    enterRoom_Client1();
                });
            }

            function doAuth_client2() {
                client2.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client1.once('successAuth',function(){
                    enterRoom_Client2();
                });
            }

            //***************************
            // 入室 - ゲームスタート
            //***************************
            function enterRoom_Client1(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom', function() {
                    client1.once('gameStart', function() {
                        client1.emit('command', {
                            method : 'ready'
                        });
                        client1.once('resp', doWaitPhase1_Client1);
                    });
                });
            }

            function enterRoom_Client2(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom', function() {
                    client2.once('gameStart', function() {
                        client2.emit('command', {
                            method : 'ready'
                        });
                        client2.once('resp', doWaitPhase1_Client2);
                    });
                });
            }

            //***************************
            // ウェイトフェイズ1
            //***************************
            function assertOfWaitPhase1(data) {
                var expect = {
                    phase : 'wait',
                    atackUserId : 'test001@gmail.com',
                    turn : 10,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000,
                            skillPoint : 1
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
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
                var expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000,
                            skillPoint : 1
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000,
                            skillPoint : 1
                        }
                    }
                };
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function doAtackCommandPhase_Client1(data) {
                assertOfAtackCommandPhase(data);
                client1.emit('command', {
                    method : 'charge'
                });
                client1.once('resp', doChargePhase_Client1);
            }

            function doAtackCommandPhase_Client2(data) {
                assertOfAtackCommandPhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doChargePhase_Client2);
            }

            //***************************
            // ディフェンスコマンドフェイズ
            //***************************
            function assertOfChargePhase(data) {
                var expect = {
                    phase : 'charge',
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 0,
                            skillPoint : 1
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000,
                            skillPoint : 1
                        }
                    }
                };
                assert.deepEqual(data, expect, 'チャージフェイズのレスポンスオブジェクトが正しい');
            }

            function doChargePhase_Client1(data) {
                assertOfChargePhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_Client1);
            }

            function doChargePhase_Client2(data) {
                assertOfChargePhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_Client2);
            }

            //***************************
            // ディフェンスコマンドフェイズ
            //***************************
            function assertOfWaitPhase2(data) {
                var expect = {
                    phase : 'wait',
                    atackUserId : 'test002@gmail.com',
                    turn : 7,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 3500,
                            skillPoint : 1
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 5100,
                            skillPoint : 1
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズに戻る');
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
