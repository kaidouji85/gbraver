describe('serverクラスのテスト', function(){
    var SERVER_PORT = 3000;
    var SERVER_URL = 'http://localhost';  
    var testDataUses = require('./testDataUsers.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var option = {
        'force new connection' : true,
         port : 3000
    };
    var app = require('http').createServer().listen(3000);
    var server = require('../server.js');
    var Server = server({
        httpServer : app
    });
    var roomId = -1;
    var complates;
        
    Server.onGetUserData(function(userId,fn){
        var userData = testDataUses.getUserData(userId);
        fn(null,userData);
    });
    
    beforeEach(function(){
        roomId ++;
        complates = {};
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
                
                clients[userId].on('gameStart', function(data){
                    assertOfGameStart(data);
                    complateCLient(userId);
                    if(isFinishTest()){
                        done();
                    }              
                });
            });
            
            function assertOfGameStart(data) {
                var expect = {
                    0 : {
                        userId : 0,
                        status : {
                            name : 'ゼロブレイバー',
                            pictName : 'GranBraver.PNG',
                            hp : 4200,
                            speed : 500,
                            active : 0,
                            battery : 5,
                            weapons : {
                                1 : {
                                    name : 'ゼロナックル',
                                    power : 1200
                                },
                                2 : {
                                    name : 'ゼロナックル',
                                    power : 1200
                                },
                                3 : {
                                    name : 'ゼロナックル',
                                    power : 1700
                                },
                                4 : {
                                    name : 'ゼロナックル',
                                    power : 2700
                                },
                                5 : {
                                    name : 'ゼロナックル',
                                    power : 3700
                                },
                            }
                        }
                    },
                    1 : {
                        userId : 1,
                        status : {
                            name : 'グランブレイバー',
                            pictName : 'GranBraver.PNG',
                            hp : 3200,
                            speed : 500,
                            active : 0,
                            battery : 5,
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
                    }
                };
                assert.deepEqual(data, expect, 'gameStartのレスポンスが正しい');
            }
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
                            assert.deepEqual(data,expect);
                            complateCLient(userId);
                            if(isFinishTest()){
                                done();
                            }
                        });
                    });          
                });
            });    
        });
        
        it('攻撃、防御バッテリーを決定してダメージ計算結果を受け取り、再びウェイトフェイズに遷移する',function(done){
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
                                assertOfWaitPhase1(data);
                                client1.emit('command',{method:'ok'});
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client1.emit('command',{
                                    method : 'atack',
                                    param : {
                                        battery : 3
                                    }
                                });
                                break;
                            case 2:
                                assertOfDefenthCommandPhase(data);
                                client1.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 3:
                                assertOfDamagePhase(data);
                                client1.emit('command',{method : 'ok'});
                                break;
                            case 4:
                                assertOfWaitPhase2(data);
                                complateCLient(1);
                                if(isFinishTest()){
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
                                assertOfWaitPhase1(data);
                                client2.emit('command',{method:'ok'});
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client2.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 2:
                                assertOfDefenthCommandPhase(data);
                                client2.emit('command',{
                                    method : 'defenth',
                                    param : {
                                        battery : 2
                                    }
                                });
                                break;
                            case 3:
                                assertOfDamagePhase(data);
                                client2.emit('command',{method : 'ok'});
                                break;
                            case 4:
                                assertOfWaitPhase2(data);                            
                                complateCLient(2);
                                if(isFinishTest()){
                                    done();
                                }
                                break;
                        }
                        count ++;
                    });
                });
            });
            
            function assertOfWaitPhase1(data) {
                expect = {
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
                assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfAtackCommandPhase(data) {
                expect = {
                    phase : 'atackCommand',
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
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }
            
            function assertOfDefenthCommandPhase(data) {
                expect = {
                    phase : 'defenthCommand',
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
                assert.deepEqual(data, expect, 'ディフェンスコマンドフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfDamagePhase(data) {
                expect = {
                    phase : 'damage',
                    hit : 1,
                    damage : 1600,
                    atackBattery : 3,
                    defenthBattery : 2,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 2,
                            active : 0
                        },
                        2 : {
                            hp : 3100,
                            battery : 3,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ダメーフェイズのレスポンスオブジェクトが正しい');
            }

            function assertOfWaitPhase2(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : '2',
                    turn : 7,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 2,
                            active : 3500
                        },
                        2 : {
                            hp : 3100,
                            battery : 4,
                            active : 5100
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
            }
        });
        
        it('チャージコマンドを実行してウェイトフェイズに遷移する',function(done){
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
                                assertOfWaitPhase1(data);
                                client1.emit('command',{method:'ok'});
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client1.emit('command',{
                                    method : 'charge'
                                });
                                break;
                            case 2:
                                assertOfChargePhase(data);
                                client1.emit('command',{
                                    method : 'ok'
                                });                                    
                                break;
                            case 3:
                                assertOfWaitPhase2(data);                          
                                complateCLient(1);
                                if(isFinishTest()){
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
                                assertOfWaitPhase1(data);
                                client2.emit('command',{method:'ok'});
                                break;
                            case 1:
                                assertOfAtackCommandPhase(data);
                                client2.emit('command',{
                                    method : 'ok'
                                });
                                break;
                            case 2:
                                assertOfChargePhase(data);
                                client2.emit('command',{
                                    method : 'ok'
                                });                                
                                break;
                            case 3:
                                assertOfWaitPhase2(data);
                                complateCLient(2);
                                if(isFinishTest()){
                                    done();
                                }
                                break;
                        }
                        count ++;
                    });
                });
            });
            
            function assertOfWaitPhase1(data){
                expect = {
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
                assert.deepEqual(data, expect, 'ウェイトフェイズのレスポンスオブジェクトが正しい');
            }
            
            function assertOfAtackCommandPhase(data) {
                expect = {
                    phase : 'atackCommand',
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
                assert.deepEqual(data, expect, 'アタックコマンドフェイズのレスポンスオブジェクトが正しい');
            }
            
            function assertOfChargePhase(data){
                expect = {
                    phase : 'charge',
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 5,
                            active : 0
                        },
                        2 : {
                            hp : 4700,
                            battery : 5,
                            active : 3000
                        }
                    }
                };
                assert.deepEqual(data, expect, 'チャージフェイズのレスポンスオブジェクトが正しい');
            }
            
            function assertOfWaitPhase2(data) {
                expect = {
                    phase : 'wait',
                    atackUserId : '2',
                    turn : 7,
                    statusArray : {
                        1 : {
                            hp : 3200,
                            battery : 5,
                            active : 3500
                        },
                        2 : {
                            hp : 4700,
                            battery : 5,
                            active : 5100
                        }
                    }
                };
                assert.deepEqual(data, expect, 'ウェイトフェイズに戻る');
            }
        });
    });
    
    after(function(){
        app.close();
    });
});