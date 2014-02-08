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

    afterEach(function(){
        roomId ++;
    });

    describe('入室正常系',function(){
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
        
        //本システムのsocket.ioサーバテストは、2つのクライアントデータが正しく
        var userIds = [0,1];
        userIds.forEach(function(userId){
            it('2人入室したらサーバから「gameStart」が返される #ユーザ' + userId + 'の確認', function(done) {
                var clients = [];
                for (var i in userIds) {
                    clients[i] = io.connect(SERVER_URL, option);
                    clients[i].emit('enterRoom', {
                        roomId : roomId,
                        userId : i
                    });
                }

                clients[userId].on('succesEnterRoom', function() {
                    clients[userId].on('gameStart', function() {
                        done();
                    });
                });
            });
        });
        



    });
});