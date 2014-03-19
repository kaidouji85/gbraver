describe('serverクラスのテスト', function() {
    var SERVER_PORT = 4000;
    var SERVER_URL = 'http://localhost';

    var testDataUses = require('./testDataUsers.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT);
    var server = require('../server.js');

    var option;
    var Server;
    var roomId = 1;
    var complates = {};

    before(function() {
        option = {
            'force new connection' : true,
            port : SERVER_PORT
        };
        Server = server({
            httpServer : app
        });
        Server.onGetUserData(function(userId, fn) {
            var userData = testDataUses.getUserData(userId);
            fn(null, userData);
        });
    });

    after(function() {
        app.close();
    });

    describe('戦闘ロジック#攻撃・防御を一通り', function() {
        it('攻撃、防御バッテリーを決定してダメージ計算結果を受け取り、再びウェイトフェイズに遷移する', function(done) {
            //ユーザ1の挙動 
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.once('succesEnterRoom', function() {
                client1.once('gameStart', function() {
                    doGameStart_Client1();
                });
            });

            function doGameStart_Client1() {
                client1.emit('command', {
                    method : 'ready'
                });
                client1.once('resp', doWaitPhase1_Client1);
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
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client1.once('resp', doDefenthCommandPhase_Client1);
            }

            function doDefenthCommandPhase_Client1(data) {
                assertOfDefenthCommandPhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamagePhase_Client1);
            }

            function doDamagePhase_Client1(data) {
                assertOfDamagePhase(data);
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_Client1);
            }

            function doWaitPhase2_Client1(data) {
                assertOfWaitPhase2(data);
                complateCLient(1);
                if (isFinishTest()) {
                    done();
                }
            }
            
            //ユーザ2の挙動
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('enterRoom', {
                roomId : roomId,
                userId : 2
            });
            client2.once('succesEnterRoom', function() {
                client2.once('gameStart', function() {
                    doGameStart_Client2();
                });
            });

            function doGameStart_Client2() {
                client2.emit('command', {
                    method : 'ready'
                });
                client2.once('resp', doWaitPhase1_Client2);
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
                client2.once('resp', doDefenthCommandPhase_Client2);
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

            function doDamagePhase_Client2(data) {
                assertOfDamagePhase(data);
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_Client2);
            }

            function doWaitPhase2_Client2(data) {
                assertOfWaitPhase2(data);
                complateCLient(2);
                if (isFinishTest()) {
                    done();
                }
            }
            
            //アサーション
            function assertOfWaitPhase1(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : '1',
                    turn : 10,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        2 : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズ#1のレスポンスオブジェクトが正しい');
            }

            function assertOfAtackCommandPhase(data) {
                expect = {
                    phase : 'atackCommand',
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        2 : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfDefenthCommandPhase(data) {
                expect = {
                    phase : 'defenthCommand',
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        2 : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ディフェンスコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfDamagePhase(data) {
                expect = {
                    phase : 'damage',
                    hit : 1,
                    damage : 1600,
                    atackBattery : 3,
                    defenthBattery : 2,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 2,
                            active : 0
                        },
                        2 : {
                            hp : 3100,
                            battery : 3,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ダメーフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfWaitPhase2(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : '2',
                    turn : 7,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 2,
                            active : 3500
                        },
                        2 : {
                            hp : 3100,
                            battery : 4,
                            active : 5100
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズ#2のレスポンスオブジェクトが正しい');
            }
        });
    });

    function complateCLient(index) {
        complates[index] = "";
    }

    function isFinishTest() {
        if (Object.keys(complates).length === 2) {
            return true;
        } else {
            return false;
        }
    }

});
