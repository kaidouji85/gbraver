describe('serverクラスのテスト', function(){
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var SERVER_PORT = 3000;
    var SERVER_URL = 'http://localhost';
    var roomId = 0;
    var option = {
        'force new connection' : true,
         port : 3000
    };
    var app = require('http').createServer().listen(3000);
    var server = require('../server.js');
    var Server = server({
        httpServer : app
    });
    
    //test data
    var user = {};
    user[0] = {
        userId : 0,
        status :{
            name : 'ゼロブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 4200,
            speed : 500,
            active : 0,
            battery : 5,
            weapons : {
                1 : {name:'ゼロナックル',power:1200},
                2 : {name:'ゼロナックル',power:1200},
                3 : {name:'ゼロナックル',power:1700},
                4 : {name:'ゼロナックル',power:2700},
                5 : {name:'ゼロナックル',power:3700},
            }
        }
    };    
    
    user[1] = {
        userId : 1,
        status :{
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            speed : 500,
            active : 0,
            battery : 5,
            weapons : {
                1 : {name:'バスターナックル',power:800},
                2 : {name:'バスターナックル',power:1100},
                3 : {name:'バスターナックル',power:1600},
                4 : {name:'バスターナックル',power:2100},
                5 : {name:'バスターナックル',power:2800},
            }
        }
    };
    
    user[2] = {
        userId : 2,
        status :{
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            speed : 250,
            active : 0,
            battery : 5,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        }
    };
    
    
    Server.onGetUserData(function(userId,fn){
        fn(null,user[userId]);
    });
    
    //本テストではテストケースごとに別々のルームを利用する想定である。
    //なので、afterEachを用いてテストケース終了毎にルームIDを
    //0、1、2、3とインクリメントさせている。
    afterEach(function(){
        roomId ++;
    });

    describe('入室系テスト',function(){
        it('入室したらサーバから「succesEnterRoom」が返される',function(done){
            var client = io.connect(SERVER_URL,option);
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            
            client.on('succesEnterRoom',function(){
                done();    
            });
        });
        
        it('2人が入室したら「gameStart」が返される', function(done) {
            var userIds = [0, 1];
            var clients = [];
            var gameStartCount = 0;
            userIds.forEach(function(userId) {
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('enterRoom', {
                    roomId : roomId,
                    userId : userId
                });

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function(data) {
                        var expect = {
                            0 : user[0],
                            1 : user[1]
                        };
                        assert.deepEqual(data, expect, 'ユーザのデータが正しく取得できる');
                        //「gameStart」を2人が受信したらテスト成功
                        gameStartCount++;
                        if (gameStartCount===2) {
                            done();
                        }
                    });
                });
            });
        });    
    });
    
    describe('戦闘ロジック', function() {
        it('ウェイトフェイズに行動権を取得したユーザIDが返される', function(done) {
            var userIds = [1, 2];
            var clients = [];
            var waitPhaseCount = 0;
            userIds.forEach(function(userId) {
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('enterRoom', {
                    roomId : roomId,
                    userId : userId
                });

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function(data) {
                        console.log('emit ready uid='+userId);
                        clients[userId].emit('ready');
                        clients[userId].on('waitPhase', function(data) {
                            var expect = {
                                atackUserId : '1',
                                turn : 10
                            };
                            assert.deepEqual(data, expect, '正しいウェイトフェイズオブジェクトが返される');
                            waitPhaseCount ++;
                            if(waitPhaseCount===2){
                                done();    
                            }
                            
                        });
                        
                    });
                });
            });
        }); 
    });
});