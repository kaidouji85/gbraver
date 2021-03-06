//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../../../server/server.js');
    var testCompleter = require('./../testData/testCompleter.js');
    var dbMock = require('./../testData/dbMock.js')();

    var app;
    var option;
    var Server;
    var roomId = 1;

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app,
            dao : dbMock
        });
    });

    afterEach(function() {
        app.close();
    });

    describe('戦闘ロジック#攻撃・防御を一通り', function() {
        it('HPが0になったのでゲームが終了する', function(done) {
            var client1 = io.connect(SERVER_URL, option);
            var client2 = io.connect(SERVER_URL, option);
            var tc = testCompleter({done:done});

            //***************************
            // ユーザ認証
            //***************************
            doAuth_client1();
            doAuth_client2();

            function doAuth_client1() {
                client1.emit('auth',{
                    userId : 'test003@gmail.com'
                });
                client1.once('successAuth',function(){
                    enterRoom_Client1();
                });
            }

            function doAuth_client2() {
                client2.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client1.once('successAuth',function(){
                    enterRoom_Client2();
                });
            }

            //***************************
            // 入室
            //***************************
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

            //***************************
            // ゲームスタート
            //***************************
            function doGameStart_Client1() {
                client1.emit('command', {
                    method : 'ready'
                });
                client1.once('resp', doWaitPhase1_Client1);
            }

            function doGameStart_Client2() {
                client2.emit('command', {
                    method : 'ready'
                });
                client2.once('resp', doWaitPhase1_Client2);
            }

            //***************************
            // ウェイトフェイズ1
            //***************************
            function doWaitPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase_Client1);
            }

            function doWaitPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase_Client2);
            }

            //***************************
            // アタックコマンドフェイズ
            //***************************
            function doAtackCommandPhase_Client1(data) {
                client1.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 3
                    }
                });
                client1.once('resp', doDefenthCommandPhase_Client1);
            }

            function doAtackCommandPhase_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDefenthCommandPhase_Client2);
            }

            //***************************
            // ディフェンスコマンドフェイズ
            //***************************
            function doDefenthCommandPhase_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamagePhase_Client1);
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

            //***************************
            // ダメージフェイズ
            //***************************
            function doDamagePhase_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doGameEndPhase_Client1);
            }

            function doDamagePhase_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doGameEndPhase_Client2);
            }

            //***************************
            // ゲームエンドフェイズ
            //***************************
            function assertOfGameEndPhase(data){
                var expect = {
                    phase : 'gameEnd',
                    winner : 'test003@gmail.com',
                    statusArray : {
                        'test003@gmail.com' : {
                            hp : 4700,
                            battery : 2,
                            active : 0,
                            skillPoint : 1,
                            overHeatFlag : false,
                            specialPoint : 0
                        },
                        'test002@gmail.com' : {
                            hp : -300,
                            battery : 3,
                            active : 1500,
                            skillPoint : 1,
                            overHeatFlag : false,
                            specialPoint : 0
                        }
                    }
                };
                assert.deepEqual(data,expect,'ゲーム終了判定のオブジェクトが正しい');
            }

            function doGameEndPhase_Client1(data) {
                assertOfGameEndPhase(data);
                dissolveRoom_client1();
            }

            function doGameEndPhase_Client2(data) {
                assertOfGameEndPhase(data);
                dissolveRoom_client2();
            }

            //***************************
            // 退室
            //***************************
            function dissolveRoom_client1(){
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('dissolveRoom', function(){
                    reEnterRoom_client1();
                });
            }

            function dissolveRoom_client2(){
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('dissolveRoom', function(){
                    reEnterRoom_client2();
                });
            }


            //***************************
            // 再入室
            //***************************
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
        });
    });
});
