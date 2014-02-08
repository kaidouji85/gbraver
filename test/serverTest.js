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

    //本テストではテストケースごとに別々のルームを利用する想定である。
    //なので、afterEachを用いてテストケース終了毎にルームIDを
    //0、1、2、3とインクリメントさせている。
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