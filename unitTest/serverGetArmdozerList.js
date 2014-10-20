describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var testArmdozerData = require('./testArmdozerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
        Server.onGetArmdozerList(testArmdozerData.getArmdozerList);
    });

    afterEach(function() {
        app.close();
    });

    it('アームドーザリストを取得できる',function(done){
        var client = io.connect(SERVER_URL, option);
        client.emit('auth',{
            userId : 'test001@gmail.com'
        });
        client.once('successAuth',getArmdozerList);

        function getArmdozerList(){
            client.emit('getArmdozerList');
            client.once('successGetArmdozerList',function(data){
                var expect = [
                    {
                        name : 'ランドーザ',
                        pictName : 'Landozer.PNG',
                        hp : 4700,
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
                        name : 'グランブレイバー',
                        pictName : 'GranBraver.PNG',
                        hp : 3200,
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
                    }
                ];
                assert.deepEqual(data,expect,'アームドーザリストが取得できる。');
                done();
            });
        }
    });
});