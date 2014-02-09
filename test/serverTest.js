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
        
        //本テストでは2プレイヤーに「gameStart」が送信されることを確認するものだが、
        //1テストケースでは1プレイヤーの通信レスポンスしかテストができない。
        //そこで本テストでは
        //  (1)ユーザ0、ユーザ1がルームXに入室 -> ユーザ0が「gameStart」を送信する
        //  (2)ユーザ0、ユーザ1がルームX+1に入室 -> ユーザ1が「gameStart」を送信する
        //というパターンを用意することで、2プレイヤーの通信をテストすることにした。
        //
        //しかし、(1)、(2)で異なるのは「gameStart」を受信したユーザIDだけであり、
        //コピー&ペーストで作成するのは保守性が悪いと考えforEachを用いてコード量を少なくすることにした。
        var userIds = [0,1];
        userIds.forEach(function(userId){
            it('2人が入室したらユーザID'+userId+'に「gameStart」が返される', function(done) {
                var clients = [];
                for (var i in userIds) {
                    var nowUserId = userIds[i];
                    clients[nowUserId] = io.connect(SERVER_URL, option);
                    clients[nowUserId].emit('enterRoom', {
                        roomId : roomId,
                        userId : i
                    });
                }

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function(data) {
                        var expect = {
                            0 : user[0],
                            1 : user[1]
                        };
                        assert.deepEqual(data,expect,'ユーザのデータが正しく取得できる');
                        done();
                    });
                });
            });
        });
    });
    
    describe('戦闘ロジック', function() {
        var userIds = [1, 2];
        userIds.forEach(function(userId) {
            it('ウェイトフェイズにユーザID' + userId + 'が行動権を取得したユーザIDが返される', function(done) {
                var clients = [];
                for (var i in userIds) {
                    var nowUserId = userIds[i];
                    clients[nowUserId] = io.connect(SERVER_URL, option);
                    clients[nowUserId].emit('enterRoom', {
                        roomId : roomId,
                        userId : i
                    });
                }

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function(data) {
                        clients[userId].on('waitPhase', function(data) {
                            var expect = {
                                atackuserId : 1,
                                turn : 10
                            };
                            assert.deepEqual(data, expect, '正しいウェイトフェイズオブジェクトが返される');
                            done();
                        });
                    });
                });
            });
        });
    });
});