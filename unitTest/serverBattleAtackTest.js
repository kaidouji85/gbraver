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

    describe('戦闘ロジック#攻撃・防御を一通り', function() {
        it('攻撃、防御バッテリーを決定してダメージ計算結果を受け取り、再びウェイトフェイズに遷移するaaaa', function(done) {
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
                                    method : 'atack',
                                    param : {
                                        battery : 3
                                    }
                                });
                                break;
                            case 2:
                                assertOfDefenthCommandPhase(data);
                                client1.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 3:
                                assertOfDamagePhase(data);
                                client1.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 4:
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
                                assertOfDefenthCommandPhase(data);
                                client2.emit('command', {
                                    method : 'defenth',
                                    param : {
                                        battery : 2
                                    }
                                });
                                break;
                            case 3:
                                assertOfDamagePhase(data);
                                client2.emit('command', {
                                    method : 'ok'
                                });
                                break;
                            case 4:
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
        assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
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
