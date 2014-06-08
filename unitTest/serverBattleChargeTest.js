describe('serverクラスのテスト', function() {
    var SERVER_PORT = 5000;
    var SERVER_URL = 'http://localhost';

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT);
    var server = require('../server.js');
    var testCompleter = require('./testCompleter.js');

    var option;
    var Server;
    var roomId = -1;

    before(function() {
        option = {
            'force new connection' : true,
            port : SERVER_PORT
        };
        Server = server({
            httpServer : app
        });
        roomId = -1;
        Server.onGetPlayerData(testPlayerData.getPlayerData);
    });

    beforeEach(function() {
        roomId++;
        complates = {};
    });

    after(function() {
        app.close();
    });

    describe('戦闘ロジック#チャージ', function() {
        it('チャージコマンドを実行してウェイトフェイズに遷移する', function(done) {
            var tc = testCompleter({done:done});
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client1.once('successAuth',function(){
                enterRoom_Client1();
            });
            
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

            function doWaitPhase1_Client1(data) {
                assertOfWaitPhase1(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase_Client1);
            }

            function doAtackCommandPhase_Client1(data) {
                assertOfAtackCommandPhase(data);
                client1.emit('command', {
                    method : 'charge'
                });
                client1.once('resp', doChargePhase_Client1);
            }

            function doChargePhase_Client1(data) {
                assertOfChargePhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_Client1);
            }

            function doWaitPhase2_Client1(data) {
                assertOfWaitPhase2(data);
                tc.completeClient('test001@gmail.com');
            }

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('auth',{
                userId : 'test002@gmail.com'
            });
            client1.once('successAuth',function(){
                enterRoom_Client2();
            });
            
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

            function doWaitPhase1_Client2(data) {
                assertOfWaitPhase1(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase_Client2);
            }

            function doAtackCommandPhase_Client2(data) {
                assertOfAtackCommandPhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doChargePhase_Client2);
            }

            function doChargePhase_Client2(data) {
                assertOfChargePhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_Client2);
            }

            function doWaitPhase2_Client2(data) {
                assertOfWaitPhase2(data);
                tc.completeClient('test002@gmail.com');
            }
            
            //アサーション
            function assertOfWaitPhase1(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : 'test001@gmail.com',
                    turn : 10,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfAtackCommandPhase(data) {
                expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfChargePhase(data) {
                expect = {
                    phase : 'charge',
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 0
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'チャージフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfWaitPhase2(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : 'test002@gmail.com',
                    turn : 7,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 3500
                        },
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 5,
                            active : 5100
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズに戻る');
            }

        });
    });
});
