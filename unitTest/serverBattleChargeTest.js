describe('serverクラスのテスト', function() {
    var SERVER_PORT = 5000;
    var SERVER_URL = 'http://localhost';

    var testDataUses = require('./testDataUsers.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT);
    var server = require('../server.js');

    var option;
    var Server;
    var roomId = -1;
    var complates;

    before(function() {
        option = {
            'force new connection' : true,
            port : SERVER_PORT
        };
        Server = server({
            httpServer : app
        });
        roomId = -1;
        Server.onGetUserData(function(userId, fn) {
            var userData = testDataUses.getUserData(userId);
            fn(null, userData);
        });
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
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.on('succesEnterRoom', function() {
                client1.on('gameStart', function() {
                    client1.emit('command', {
                        method : 'ready'
                    });
                    var count = 0;
                    client1.on('resp', function(data) {
                        var expect;
                        switch(count) {
                            case 0:
                                assertOfWaitPhase1(data);
                                client1.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client1.emit('command', {
                                    method : 'charge'
                                });
                                break;
                            case 2:
                                assertOfChargePhase(data);
                                client1.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 3:
                                assertOfWaitPhase2(data);
                                complateCLient(1);
                                if (isFinishTest()) {
                                    done();
                                }
                                break;
                        }
                        count++;
                    });
                });
            });

            var client2 = io.connect(SERVER_URL, option);
            client2.emit('enterRoom', {
                roomId : roomId,
                userId : 2
            });
            client2.on('succesEnterRoom', function() {
                client2.on('gameStart', function() {
                    client2.emit('command', {
                        method : 'ready'
                    });
                    var count = 0;
                    client2.on('resp', function(data) {
                        var expect;
                        switch(count) {
                            case 0:
                                assertOfWaitPhase1(data);
                                client2.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client2.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 2:
                                assertOfChargePhase(data);
                                client2.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 3:
                                assertOfWaitPhase2(data);
                                complateCLient(2);
                                if (isFinishTest()) {
                                    done();
                                }
                                break;
                        }
                        count++;
                    });
                });
            });
        });
    });

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
        assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
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

    function assertOfChargePhase(data) {
        expect = {
            phase : 'charge',
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 0
                },
                2 : {
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
            atackUserId : '2',
            turn : 7,
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 3500
                },
                2 : {
                    hp : 4700,
                    battery : 5,
                    active : 5100
                }
            }
        };
        assert.deepEqual(data, expect, 'ウェイトフェイズに戻る');
    }

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
