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
            speed : 300,
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
                
                clients[userId].on('succesEnterRoom', function(){
                    clients[userId].on('gameStart', function(data) {
                        var expect = {
                            0 : user[0],
                            1 : user[1]
                        };
                        assert.deepEqual(data,expect);
                    });                        
                });
                
                clients[userId].on('gameStart', function(data){
                    //「gameStart」を2人が受信したらテスト成功
                    gameStartCount++;
                    if (gameStartCount===2) {
                        done();
                    }                
                });
            });
        });
        
        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ルームID、ユーザIDが前回入室時と同じ',function(done){
            var client = io.connect(SERVER_URL,option);
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            
            client.on('enterRoomError',function(message){
                assert.equal(message,'このコネクションは既に入室しています。');
                done();
            });
        });  
        
        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ルームIDが前回入室時と同じ',function(done){
            var client = io.connect(SERVER_URL,option);
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 1
            });
            
            client.on('enterRoomError',function(message){
                assert.equal(message,'このコネクションは既に入室しています。');
                done();
            });
        });
        
        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ユーザDが前回入室時と同じ',function(done){
            var client = io.connect(SERVER_URL,option);
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom',{
                roomId : roomId+1,
                userId : 0
            });
            
            client.on('enterRoomError',function(message){
                assert.equal(message,'このコネクションは既に入室しています。');
                done();
            });
        });
        
        it('入室しているプレイヤーが同じ部屋に入室しようとしたらエラーがでる #ユーザD、ルームィIDが前回入室時と違う',function(done){
            var client = io.connect(SERVER_URL,option);
            client.emit('enterRoom',{
                roomId : roomId,
                userId : 0
            });
            client.emit('enterRoom',{
                roomId : roomId+1,
                userId : 1
            });
            
            client.on('enterRoomError',function(message){
                assert.equal(message,'このコネクションは既に入室しています。');
                done();
            });
        });
    });
    
    
    describe('戦闘ロジック', function() {
        it('入室して「ready」を送信したらウェイトフェイズの結果が返される',function(done){
            var userIds = [1,2];
            var clients = [];
            var respCount=0;
            userIds.forEach(function(userId){
                clients[userId] = io.connect(SERVER_URL, option);
                clients[userId].emit('enterRoom', {
                    roomId : roomId,
                    userId : userId
                });
                
                clients[userId].on('succesEnterRoom',function(){              
                    clients[userId].on('gameStart',function(){
                        clients[userId].emit('command',{
                            name : 'ready'
                        });
                        clients[userId].on('resp',function(data){
                            var expect = {
                                phase : 'wait',
                                atackUserId : '1',
                                turn : 10
                            };
                            assert.deepEqual(data,expect);
                            respCount ++;
                            if(respCount===2){
                                done();
                            }
                        });
                    });          
                });
            });    
        });
        
        /*
        it('ウェイトフェイズからアタックコマンドフェイズに遷移する',function(done){
            var isGreen = 0;
            function greenCheck(){
                isGreen ++;
                if(isGreen===2){
                    done();
                }
            }
            
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.on('succesEnterRoom', function() {
                client1.on('gameStart', function() {
                    client1.emit('ready');
                    var count = 0;
                    client1.on('resp', function(data) {
                        switch(count){
                            case 0:
                                assert.equal('wait',data.phase,'ウェイトフェイズになる');
                                client1.emit('command','ok');
                                break;
                            case 1:
                                var expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズ告知のオブジェクトが正しい');
                                break;
                        }
                        count ++;
                    });
                });
            });

            var client2 = io.connect(SERVER_URL, option);
            client2.emit('enterRoom', {
                roomId : roomId,
                userId : 2
            });
            client2.on('succesEnterRoom', function() {
                client2.on('gameStart', function() {
                    client2.emit('ready');
                    var count = 0;
                    client2.on('resp', function(data) {
                        switch(count){
                            case 0:
                                assert.equal('wait',data.phase,'ウェイトフェイズになる');
                                client2.emit('command','ok');
                                break;
                            case 1:
                                var expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズ告知のオブジェクトが正しい');
                                break;
                        }
                        count ++;
                    });
                });
            });
        });
        */
    });
});