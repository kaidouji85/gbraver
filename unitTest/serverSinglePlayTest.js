//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');

    var app;
    var server = require('../server.js');
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app
        });
        testServer.onGetPlayerData(testPlayerData.getPlayerData);
        testServer.onGetCharacterInfo(function(armdozerId,fn){
            var landozer = {
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
            };
            fn(null,landozer);
        });
    });

    afterEach(function() {
        app.close();
    });

    describe('一人用モード',function(){
        it('プレイヤーが攻撃を選択',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test001@gmail.com'
                });
                client.once('successAuth',startSinglePlay);
            }

            function startSinglePlay() {
                client.emit('startSinglePlay',{
                    enemyId : 'landozer'
                });
                client.once('gameStart',gameStart);
            }

            function gameStart(){
                client.emit('command',{
                    method : 'ready'
                });
                client.once('resp',waitPhase);
            }

            function waitPhase(data){
                var expect = {
                    phase : 'wait',
                    atackUserId : 'test001@gmail.com',
                    turn : 10,
                    statusArray : {
                        'test001@gmail.com' : {
                            hp : 3200,
                            battery : 5,
                            active : 5000
                        },
                        'nonePlayerCharacter' : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data,expect,'ウェイトフェイズの情報が正しい');
                done();
            }
        });
    });
});