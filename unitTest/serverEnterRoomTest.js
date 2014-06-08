//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;
    
    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT); 
    var server = require('../server.js');
    var testCompleter = require('./testCompleter.js');
    
    var option;
    var Server;
    var roomId = -1;
    
    before(function(){
        option = {
            'forceNew' : true
        };
        Server = server({
            httpServer : app
        });
        roomId = -1;
        Server.onGetPlayerData(testPlayerData.getPlayerData);
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
            var client = io(SERVER_URL, option);
            client.on('connect',function(){
                client.emit('auth',{
                    userId : 'test001@gmail.com'
                });
                client.once('successAuth',function(){
                    client.emit('enterRoom', {
                        roomId : roomId
                    });
                    client.on('succesEnterRoom', function() {
                        done();
                    });
                });
            });
        });

        it('2人が入室したら「gameStart」が返される', function(done) {
            var tc = testCompleter({done:done});
            var userIds = ['test001@gmail.com', 'test002@gmail.com'];
            var clients = [];
            var gameStartCount = 0;
            userIds.forEach(function(userId) {
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('auth',{
                    userId : userId
                });
                clients[userId].once('successAuth',function(){
                    enterRoom();
                });

                function enterRoom() {
                    clients[userId].emit('enterRoom', {
                        roomId : roomId
                    });
                    clients[userId].once('gameStart', function(data) {
                        assertOfGameStart(data, ['test001@gmail.com', 'test002@gmail.com']);
                        tc.completeClient(userId);
                    });
                }
            });

            function assertOfGameStart(data, userIdArray) {
                var expect = {
                    'test001@gmail.com' : {
                        userId : 'test001@gmail.com',
                        status : {
                            name : 'グランブレイバー',
                            pictName : 'GranBraver.PNG',
                            active : 0,
                            battery : 5,
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
                                },
                            }
                        }
                    },
                    'test002@gmail.com' : {
                        userId : 'test002@gmail.com',
                        status : {
                            name : 'ランドーザ',
                            pictName : 'Landozer.PNG',
                            hp : 4700,
                            speed : 300,
                            active : 0,
                            battery : 5,
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
                        }
                    }
                }; 

                assert.deepEqual(data, expect, 'gameStartのレスポンスが正しい');
            }
        });
       
        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client.once('successAuth',function(){
                doubleEnterRoom();
            });
            
            function doubleEnterRoom(){
                client.emit('enterRoom', {
                    roomId : roomId
                });
                client.emit('enterRoom', {
                    roomId : roomId
                });

                client.once('enterRoomError', function(message) {
                    assert.equal(message, 'このコネクションは既に入室しています。');
                    done();
                }); 
            }
        });
        
         it('入室しているプレイヤーが別の部屋に入室しようとしたらエラーがでる', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client.once('successAuth',function(){
                doubleEnterRoom();
            });
            
            function doubleEnterRoom(){
                client.emit('enterRoom', {
                    roomId : roomId
                });
                client.emit('enterRoom', {
                    roomId : roomId+1
                });

                client.once('enterRoomError', function(message) {
                    assert.equal(message, 'このコネクションは既に入室しています。');
                    done();
                }); 
            }
        });
        
        it('ユーザ認証なしで入室したら、エラーが返される', function(done) {
            var client = io.connect(SERVER_URL, option);
            client.emit('enterRoom', {
                roomId : roomId
            });
            client.on('enterRoomError', function(message) {
                assert.equal(message, 'ユーザ認証が完了していません。');
                done();
            }); 

        });
    });


    describe('戦闘ロジック', function() {
        it('入室して「ready」を送信したらウェイトフェイズの結果が返される', function(done) {
            var tc = testCompleter({done:done});
            var userIds = ['test001@gmail.com', 'test002@gmail.com'];
            var clients = [];
            var respCount = 0;
            userIds.forEach(function(userId) {
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('auth', {
                    userId : userId
                });
                clients[userId].once('successAuth', function() {
                    enterRoom();
                });

                function enterRoom() {
                    clients[userId].emit('enterRoom', {
                        roomId : roomId
                    });
                    clients[userId].on('succesEnterRoom', function() {
                        clients[userId].on('gameStart', function() {
                            emitReady();
                        });
                    });
                }

                function emitReady() {
                    clients[userId].emit('command', {
                        method : 'ready'
                    });
                    clients[userId].on('resp', function(data) {
                        assertOfResp(data);
                    });
                }
                
                function assertOfResp(data) {
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
                            'test002@gmail.com' : {
                                hp : 4700,
                                battery : 5,
                                active : 3000
                            }
                        }
                    };
                    assert.deepEqual(data, expect);
                    tc.completeClient(userId);
                }
            });
        });
    }); 

    describe('退出処理',function(){
        it('一人退室したのでルームが破棄される', function(done) {
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client1.once('successAuth',function(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom',function(data){
                    client1.once('gameStart', function(data) {
                        client1.disconnect();
                    });
                }); 
            });

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('auth',{
                userId : 'test002@gmail.com'
            });
            client2.once('successAuth',function(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom',function(data){
                    client2.once('gameStart', function(data) {
                        client2.once('dissolveRoom', function() {
                            done();
                        });
                    });
                });                
            });
        });
        
        it('ルーム退出後も新規ログインユーザで同一ルームへ入室できる', function(done) {
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client1.once('successAuth',function(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom',function(data){
                    client1.once('gameStart', function(data) {
                        client1.disconnect();
                    });
                }); 
            });

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('auth',{
                userId : 'test002@gmail.com'
            });
            client2.once('successAuth',function(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom',function(data){
                    client2.once('gameStart', function(data) {
                        client2.once('dissolveRoom', function() {
                            doReEnterRoom();
                        });
                    });
                });                
            });
            
            //ルーム破棄後に再ログインする
            function doReEnterRoom(){
                var client3 = io.connect(SERVER_URL, option);
                client3.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client3.once('successAuth',function(){
                    client3.emit('enterRoom', {
                        roomId : roomId
                    });
                    client3.once('succesEnterRoom',function(data){
                        done();
                    });
                });
            }
        });

        it('ルーム退出後も既存ログインユーザで同一ルームへ入室できる', function(done) {
            //ユーザ1
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('auth',{
                userId : 'test001@gmail.com'
            });
            client1.once('successAuth',function(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom',function(data){
                    client1.once('gameStart', function(data) {
                        client1.disconnect();
                    });
                });
            });

            //ユーザ2
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('auth',{
                userId : 'test002@gmail.com'
            });
            client2.once('successAuth',function(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom',function(data){
                    client2.once('gameStart', function(data) {
                        client2.once('dissolveRoom', function() {
                            doReEnterRoom();
                        });
                    });
                });
            });

            //ルーム破棄後に再ログインする
            function doReEnterRoom(){
                client2.emit('enterRoom', {
                    roomId: roomId
                });
                client2.once('succesEnterRoom', function (data) {
                    done();
                });
            }
        });
    });
}); 