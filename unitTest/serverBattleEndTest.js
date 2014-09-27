//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = 4001;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT);
    var server = require('../server.js');
    var testCompleter = require('./testCompleter.js');

    var option;
    var Server;
    var roomId = 1;

    before(function() {
        option = {
            'forceNew' : true
        };
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
    });

    after(function() {
        app.close();
    });

    describe('戦闘ロジック#攻撃・防御を一通り', function() {
        it('HPが0になったのでゲームが終了する', function(done) {
            var tc = testCompleter({done:done});

            //ユーザ1の挙動
            var client1 = io.connect(SERVER_URL, option);
            client1.emit('auth',{
                userId : 'test003@gmail.com'
            });
            client1.once('successAuth',function(){
                enterRoom_Client1();
            });

            function enterRoom_Client1(){
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom', function() {
                    client1.once('gameStart', function() {
                        doGameStart_Client1();
                    });
                });
            }

            function doGameStart_Client1() {
                client1.emit('command', {
                    method : 'ready'
                });
                client1.once('resp', doWaitPhase1_Client1);
            }

            function doWaitPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase_Client1);
            }

            function doAtackCommandPhase_Client1(data) {
                client1.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client1.once('resp', doDefenthCommandPhase_Client1);
            }

            function doDefenthCommandPhase_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamagePhase_Client1);
            }

            function doDamagePhase_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doGameEndPhase_Client1);
            }

            function doGameEndPhase_Client1(data) {
                assertOfGameEndPhase(data);
                dissolveRoom_client1();
            }

            function dissolveRoom_client1(){
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('dissolveRoom', function(){
                    reEnterRoom_client1();
                });
            }

            function reEnterRoom_client1() {
                client1.emit('enterRoom', {
                    roomId : roomId
                });
                client1.once('succesEnterRoom', function() {
                    client1.once('gameStart', function() {
                        tc.completeClient(1);
                    });
                });
            }

            //ユーザ2の挙動
            var client2 = io.connect(SERVER_URL, option);
            client2.emit('auth',{
                userId : 'test002@gmail.com'
            });
            client2.once('successAuth',function(){
                enterRoom_Client2();
            });

            function enterRoom_Client2(){
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom', function() {
                    client2.once('gameStart', function() {
                        doGameStart_Client2();
                    });
                });
            }

            function doGameStart_Client2() {
                client2.emit('command', {
                    method : 'ready'
                });
                client2.once('resp', doWaitPhase1_Client2);
            }

            function doWaitPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase_Client2);
            }

            function doAtackCommandPhase_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDefenthCommandPhase_Client2);
            }

            function doDefenthCommandPhase_Client2(data) {
                client2.emit('command', {
                    method : 'defenth',
                    param : {
                        battery : 2
                    }
                });
                client2.once('resp', doDamagePhase_Client2);
            }

            function doDamagePhase_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doGameEndPhase_Client2);
            }

            function doGameEndPhase_Client2(data) {
                assertOfGameEndPhase(data);
                dissolveRoom_client2();
            }

            function dissolveRoom_client2(){
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('dissolveRoom', function(){
                    reEnterRoom_client2();
                });
            }

            function reEnterRoom_client2() {
                client2.emit('enterRoom', {
                    roomId : roomId
                });
                client2.once('succesEnterRoom', function() {
                    client2.once('gameStart', function() {
                        tc.completeClient(2);
                    });
                });
            }

            //アサーション
            function assertOfGameEndPhase(data){
                var expect = {
                    phase : 'gameEnd',
                    winner : 'test003@gmail.com',
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 2,
                            active : 0,
                            skillPoint : 1
                        },
                        'test002@gmail.com' : {
                            hp : -300,
                            battery : 3,
                            active : 1500,
                            skillPoint : 1
                        }
                    }
                };
                assert.deepEqual(data,expect,'ゲーム終了判定のオブジェクトが正しい');
            }
        });
    });
});
