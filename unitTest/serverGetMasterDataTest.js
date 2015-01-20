//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var dbMock = require('./dbMock.js')();

    var app;
    var server = require('../server/server.js');
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
    });

    afterEach(function() {
        app.close();
    });

    describe('マスタデータの取得',function(){
        it('マスタデータが取得できる',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test003@gmail.com'
                });
                client.once('successAuth',getMasterData);
            }

            function getMasterData() {
                client.emit('getMasterData',{});
                client.once('successGetMasterData',assertOfMasterData);
            }

            function assertOfMasterData(data){
                var expect = {};
                expect.armdozerList = [
                    {
                        armdozerId : 'granBraver',
                        name : 'グランブレイバー',
                        pictName : 'GranBraver.PNG',
                        hp : 3200,
                        defense : 0,
                        speed : 500,
                        weapons : {
                            1 : {
                                name : 'バスターナックル',
                                power : 800
                            },
                            2 : {
                                name : 'バスターナックル',
                                power : 1100
                            },
                            3 : {
                                name : 'バスターナックル',
                                power : 1600
                            },
                            4 : {
                                name : 'バスターナックル',
                                power : 2100
                            },
                            5 : {
                                name : 'バスターナックル',
                                power : 2800
                            }
                        }
                    },
                    {
                        armdozerId : 'landozer',
                        name : 'ランドーザ',
                        pictName : 'Landozer.PNG',
                        hp : 4700,
                        defense : 0,
                        speed : 300,
                        weapons : {
                            1 : {
                                name : 'ブレイクパンチ',
                                power : 1200
                            },
                            2 : {
                                name : 'ブレイクパンチ',
                                power : 1700
                            },
                            3 : {
                                name : 'ブレイクパンチ',
                                power : 2300
                            },
                            4 : {
                                name : 'ブレイクパンチ',
                                power : 2900
                            },
                            5 : {
                                name : 'ブレイクパンチ',
                                power : 3800
                            }
                        }
                    },
                    {
                        armdozerId : 'saikyouBraver',
                        name: '最強ブレイバー',
                        pictName: 'Landozer.PNG',
                        hp: 4700,
                        defense : 0,
                        speed: 1000,
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
                        }
                    },
                    {
                        armdozerId : 'granBraverForQuickCharge',
                        name : 'グランブレイバー(クイックチャージ)',
                        pictName : 'GranBraver.PNG',
                        hp : 3200,
                        defense : 0,
                        speed : 1000,
                        weapons : {
                            1 : {
                                name : 'バスターナックル',
                                power : 800
                            },
                            2 : {
                                name : 'バスターナックル',
                                power : 1100
                            },
                            3 : {
                                name : 'バスターナックル',
                                power : 1600
                            },
                            4 : {
                                name : 'バスターナックル',
                                power : 2100
                            },
                            5 : {
                                name : 'バスターナックル',
                                power : 2800
                            }
                        }
                    }
                ];
                expect.pilotList = [
                    {
                        id : 'kyoko',
                        name : '恭子',
                        pict : 'kyoko.png',
                        shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                        type : 'quickCharge',
                        battery : 3
                    },
                    {
                        id : 'akane',
                        name : '茜',
                        pict : 'akane.png',
                        shout : 'まだまだ、勝負はこれからよ。',
                        type : 'recoverHp',
                        value : 0.5
                    },
                    {
                        id : 'iori',
                        name: '伊織',
                        pict: 'iori.png',
                        shout: 'この一撃に、全てを掛ける！！',
                        type: 'guardBreak'
                    }
                ];
                expect.stageData = [
                    {
                        title : '初級',
                        enemyId : 'landozer',
                        routineId : 'attack3'
                    },
                    {
                        title : '中級',
                        enemyId : 'granBraver',
                        routineId : 'attack3'
                    },
                    {
                        title : '上級',
                        enemyId : 'zeroBraver',
                        routineId : 'attack3'
                    }
                ];
                assert.deepEqual(expect,data,'マスターデータが正しい');
                done();
            }
        });
    });
});