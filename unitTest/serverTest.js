describe('serverクラスのテスト', function() {
    var SERVER_PORT = 3000;
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
    
    before(function(){
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

    describe('入室系テスト', function() {
        it('入室したらサーバから「succesEnterRoom」が返される', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });
            client.on('succesEnterRoom', function() {
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

                clients[userId].on('gameStart', function(data) {
                    assertOfGameStart(data, [0, 1]);
                    complateCLient(userId);
                    if (isFinishTest()) {
                        done();
                    }
                });
            });
        });

        function assertOfGameStart(data, userIdArray) {
            var expect = {};
            userIdArray.forEach(function(userId) {
                expect[userId] = testDataUses.getUserData(userId);
                expect[userId].status.battery = 5;
                expect[userId].status.active = 0;
            });
            assert.deepEqual(data, expect, 'gameStartのレスポンスが正しい');
        }

        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ルームID、ユーザIDが前回入室時と同じ', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });

            client.on('enterRoomError', function(message) {
                assert.equal(message, 'このコネクションは既に入室しています。');
                done();
            });
        });

        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ルームIDが前回入室時と同じ', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });

            client.on('enterRoomError', function(message) {
                assert.equal(message, 'このコネクションは既に入室しています。');
                done();
            });
        });

        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ユーザDが前回入室時と同じ', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom', {
                roomId : roomId + 1,
                userId : 0
            });

            client.on('enterRoomError', function(message) {
                assert.equal(message, 'このコネクションは既に入室しています。');
                done();
            });
        });

        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ユーザD、ルームィIDが前回入室時と違う', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom', {
                roomId : roomId + 1,
                userId : 1
            });

            client.on('enterRoomError', function(message) {
                assert.equal(message, 'このコネクションは既に入室しています。');
                done();
            });
        });
    });

    describe('戦闘ロジック', function() {
        it('入室して「ready」を送信したらウェイトフェイズの結果が返される', function(done) {
            var userIds = [1, 2];
            var clients = [];
            var respCount = 0;
            userIds.forEach(function(userId) {
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('enterRoom', {
                    roomId : roomId,
                    userId : userId
                });

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function() {
                        clients[userId].emit('command', {
                            method : 'ready'
                        });
                        clients[userId].on('resp', function(data) {
                            var expect = {
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
                            assert.deepEqual(data, expect);
                            complateCLient(userId);
                            if (isFinishTest()) {
                                done();
                            }
                        });
                    });
                });
            });
        });
    });
    
    describe('退出処理',function(){
        it('一人退室したのでルームが破棄される', function(done) {
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.once('succesEnterRoom',function(data){
                client1.once('gameStart', function(data) {
                    client1.disconnect();
                });
            });

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('enterRoom', {
                roomId : roomId,
                userId : 2
            });
            client2.once('succesEnterRoom',function(data){
                client2.once('gameStart', function(data) {
                    client2.once('disconnect', function() {
                        done();
                    });
                });
            });
        });
        
        it('ルーム退出後も入室できる', function(done) {
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.once('succesEnterRoom',function(data){
                client1.once('gameStart', function(data) {
                    client1.disconnect();
                });
            });

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('enterRoom', {
                roomId : roomId,
                userId : 2
            });
            client2.once('succesEnterRoom',function(data){
                client2.once('gameStart', function(data) {
                    client2.once('disconnect',doReEnterRoom);
                });
            });
            
            //ルーム破棄後に再ログインする
            function doReEnterRoom(){
                var client3 = io.connect(SERVER_URL, option);
                client3.emit('enterRoom', {
                    roomId : roomId,
                    userId : 2
                });
                client3.once('succesEnterRoom',function(data){
                    done();
                });
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