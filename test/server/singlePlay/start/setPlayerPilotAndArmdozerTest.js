//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('使用するアームドーザ、パイロットを指定して一人用モードを開始する', function () {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:' + SERVER_PORT;

    var testEnemyRoutineDefine = require('./../../testData/testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../../../server/server.js');
    var dbMock = require('./../../testData/dbMock.js')();

    var app;
    var testServer;
    var option = {
        'forceNew': true
    };

    beforeEach(function () {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer: app,
            dao: dbMock
        });
        testServer.onGetAttackRoutine(testEnemyRoutineDefine.getAttackRoutine);
        testServer.onGetDefenseRoutine(testEnemyRoutineDefine.getDefenseRoutine);
    });

    afterEach(function () {
        app.close();
    });


    it('一人モードを開始できる', function (done) {
        var client = io(SERVER_URL, option);
        client.on('connect', doAuth);

        function doAuth() {
            client.emit('auth', {
                userId: 'test001@gmail.com'
            });
            client.once('successAuth', startSinglePlay);
        }

        function startSinglePlay() {
            client.emit('startSinglePlay', {
                enemyId: 'landozer',
                pilotId : 'akane',
                routineId: 'zero',
                player: {
                    armdozerId: 'saikyouBraver',
                    pilotId: 'iori'
                }
            });
            client.once('gameStart', assertOfGameStart);
        }

        function assertOfGameStart(data) {
            var expect = {
                'test001@gmail.com': {
                    userId: 'test001@gmail.com',
                    status: {
                        name: '最強ブレイバー',
                        pictName: 'Landozer.PNG',
                        hp: 4700,
                        defense : 0,
                        speed: 1000,
                        active: 0,
                        battery: 5,
                        skillPoint: 1,
                        overHeatFlag : false,
                        specialPoint : 0,
                        weapons: {
                            1: {
                                name: 'ブレイクパンチ',
                                power: 5000
                            },
                            2: {
                                name: 'ブレイクパンチ',
                                power: 5000
                            },
                            3: {
                                name: 'ブレイクパンチ',
                                power: 5000
                            },
                            4: {
                                name: 'ブレイクパンチ',
                                power: 5000
                            },
                            5: {
                                name: 'ブレイクパンチ',
                                power: 5000
                            }
                        },
                        ability: {
                            type: 'none'
                        },
                        pilot: {
                            name: '伊織',
                            pict: 'iori.png',
                            shout: 'この一撃に、全てを掛ける！！',
                            type: 'guardBreak',
                            value: 500,
                            hp : 0,
                            power : 0,
                            defense : 0,
                            speed : 0
                        }
                    }
                },
                'nonePlayerCharacter': {
                    userId: 'nonePlayerCharacter',
                    status: {
                        name: 'ランドーザ',
                        pictName: 'Landozer.PNG',
                        hp: 4700,
                        defense: 0,
                        speed: 300,
                        active: 0,
                        battery: 5,
                        skillPoint: 1,
                        overHeatFlag : false,
                        specialPoint : 0,
                        weapons: {
                            1: {
                                name: 'ブレイクパンチ',
                                power: 1200
                            },
                            2: {
                                name: 'ブレイクパンチ',
                                power: 1700
                            },
                            3: {
                                name: 'ブレイクパンチ',
                                power: 2300
                            },
                            4: {
                                name: 'ブレイクパンチ',
                                power: 2900
                            },
                            5: {
                                name: 'ブレイクパンチ',
                                power: 3800
                            }
                        },
                        ability: {
                            type: 'none'
                        },
                        pilot: {
                            name: '茜',
                            pict: 'akane.png',
                            shout: 'まだまだ、勝負はこれからよ。',
                            type: 'recoverHp',
                            value: 0.5,
                            hp : 0,
                            power : 0,
                            defense : 0,
                            speed : 0
                        }
                    }
                }
            };
            assert.deepEqual(expect, data, 'apiで指定したアームドーザ、パイロットが選択されている');
            done();
        }
    });
});