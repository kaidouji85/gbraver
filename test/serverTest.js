describe('serverクラスのテスト', function(){
    var ce = require('cloneextend');
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
            speed : 300,
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
        var userData = ce.clone(user[userId]);
        fn(null,userData);
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
                            0 : {
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
                            },
                            1 : {
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
                            }
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
                            method : 'ready'
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
        
        it('攻撃、防御バッテリーを決定してダメージ計算結果を受け取り、再びウェイトフェイズに遷移する',function(done){
            var calledCount = 0;
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.on('succesEnterRoom', function() {
                client1.on('gameStart', function() {
                    client1.emit('command',{method:'ready'});
                    var count = 0;
                    client1.on('resp', function(data) {
                        var expect;
                        switch(count){
                            case 0:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '1',
                                    turn : 10
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズになる#client1');
                                client1.emit('command',{method:'ok'});
                                break;
                            case 1:
                                expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズになる#client1');
                                client1.emit('command',{
                                    method : 'atack',
                                    param : {
                                        battery : 3
                                    }
                                });
                                break;
                            case 2:
                                expect = {
                                    phase : 'defenthCommand'
                                };
                                assert.deepEqual(data,expect,'ディフェンスコマンドフェイズになる#client1');
                                client1.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 3:
                                expect = {
                                    phase : 'damage',
                                    hit : 1,
                                    damage : 1600,
                                    atackBattery : 3,
                                    defenthBattery : 2
                                };
                                assert.deepEqual(data,expect,'ダメーフェイズになる#client1');
                                client1.emit('command',{method : 'ok'});
                                break;
                            case 4:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '2',
                                    turn : 7
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズに戻る#client1');
                                calledCount ++;
                                if(calledCount === 2){
                                    done();
                                }
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
                    client2.emit('command',{method:'ready'});
                    var count = 0;
                    client2.on('resp', function(data) {
                        var expect;
                        switch(count){
                            case 0:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '1',
                                    turn : 10
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズになる#client2');
                                client2.emit('command',{method:'ok'});
                                break;
                            case 1:
                                expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズになる#client2');
                                client2.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 2:
                                var expect = {
                                    phase : 'defenthCommand'
                                };
                                assert.deepEqual(data,expect,'ディフェンスコマンドフェイズ告知のオブジェクトが正しい#client2');
                                client2.emit('command',{
                                    method : 'defenth',
                                    param : {
                                        battery : 2
                                    }
                                });
                                break;
                            case 3:
                                expect = {
                                    phase : 'damage',
                                    hit : 1,
                                    damage : 1600,
                                    atackBattery : 3,
                                    defenthBattery : 2
                                };
                                assert.deepEqual(data,expect,'ダメーフェイズになる#client2');
                                client2.emit('command',{method : 'ok'});
                                break;
                            case 4:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '2',
                                    turn : 7
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズに戻る#client2');                                
                                calledCount ++;
                                if(calledCount === 2){
                                    done();
                                }
                                break;
                        }
                        count ++;
                    });
                });
            });
        });
        
        it('チャージコマンドを実行してウェイトフェイズに遷移する',function(done){
            var calledCount = 0;
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('enterRoom', {
                roomId : roomId,
                userId : 1
            });
            client1.on('succesEnterRoom', function() {
                client1.on('gameStart', function() {
                    client1.emit('command',{method:'ready'});
                    var count = 0;
                    client1.on('resp', function(data) {
                        var expect;
                        switch(count){
                            case 0:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '1',
                                    turn : 10
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズになる#client1');
                                client1.emit('command',{method:'ok'});
                                break;
                            case 1:
                                expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズになる#client1');
                                client1.emit('command',{
                                    method : 'charge'
                                });
                                break;
                            case 2:
                                expect = {
                                    phase : 'charge'
                                };
                                assert.deepEqual(data,expect,'チャージフェイズになる#client1');
                                client1.emit('command',{
                                    method : 'ok'
                                });                                    
                                break;
                            case 3:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '2',
                                    turn : 7
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズに戻る#client1');
                                calledCount ++;
                                if(calledCount === 2){
                                    done();
                                }
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
                    client2.emit('command',{method:'ready'});
                    var count = 0;
                    client2.on('resp', function(data) {
                        var expect;
                        switch(count){
                            case 0:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '1',
                                    turn : 10
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズになる#client2');
                                client2.emit('command',{method:'ok'});
                                break;
                            case 1:
                                expect = {
                                    phase : 'atackCommand'
                                };
                                assert.deepEqual(data,expect,'アタックコマンドフェイズになる#client2');
                                client2.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 2:
                                expect = {
                                    phase : 'charge'
                                };
                                assert.deepEqual(data,expect,'チャージフェイズになる#client2');
                                client2.emit('command',{
                                    method : 'ok'
                                });                                
                                break;
                            case 3:
                                expect = {
                                    phase : 'wait',
                                    atackUserId : '2',
                                    turn : 7
                                };
                                assert.deepEqual(data,expect,'ウェイトフェイズに戻る#client2');                                
                                calledCount ++;
                                if(calledCount === 2){
                                    done();
                                }
                                break;
                        }
                        count ++;
                    });
                });
            });
        });   
    });
    
    after(function(){
        app.close();
    });
});