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

    describe('戦闘ロジック#アームドーザアビリティ', function() {
        it('アームドーザアビリティよりも死亡が優先する', function(done) {
            var client1 = io.connect(SERVER_URL, option);
            var client2 = io.connect(SERVER_URL, option);
            var tc = testCompleter({done:done});

            //**************************************************
            // ユーザ認証
            //**************************************************
            doAuth_client1();
            doAuth_client2();

            function doAuth_client1() {
                client1.emit('auth',{
                    userId : 'test005@gmail.com'
                });
                client1.once('successAuth',function(){
                    enterRoom_Client1();
                });
            }

            function doAuth_client2() {
                client2.emit('auth',{
                    userId : 'test002@gmail.com'
                });
                client2.once('successAuth',function(){
                    enterRoom_Client2();
                });
            }

            //**************************************************
            // ルームに入る
            //**************************************************
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

            //**************************************************
            // ゲームスタート
            //**************************************************
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

            //**************************************************
            // ウェイトフェイズ1
            //**************************************************
            function doWaitPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAtackCommandPhase1_Client1);
            }

            function doWaitPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAtackCommandPhase1_Client2);
            }

            //**************************************************
            // アタックコマンドフェイズ1
            // test005@gmailが0攻撃をする
            //**************************************************
            function doAtackCommandPhase1_Client1(data) {
                client1.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 0
                    }
                });
                client1.once('resp', doDefenseCommandPhase1_client1);
            }

            function doAtackCommandPhase1_Client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDefenseCommandPhase1_client2);
            }

            //**************************************************
            // ディフェンスコマンドフェイズ1
            // test002@gmailが0で防御する
            //**************************************************
            function doDefenseCommandPhase1_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDamgePhase1_client1);
            }

            function doDefenseCommandPhase1_client2(data) {
                client2.emit('command', {
                    method : 'defenth',
                    param : {
                        battery : 0
                    }
                });
                client2.once('resp', doDamgePhase1_client2);
            }

            //**************************************************
            // ダメージフェイズ1
            // フェイント攻撃なのでダメージを受けない
            //**************************************************
            function doDamgePhase1_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doWaitPhase2_client1);
            }

            function doDamgePhase1_client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doWaitPhase2_client2);
            }

            //**************************************************
            // ウェイトフェイズ2
            //**************************************************
            function doWaitPhase2_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doAttackCommandPhase2_client1);
            }

            function doWaitPhase2_client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doAttackCommandPhase2_client2);
            }

            //**************************************************
            // アタックコマンドフェイズ2
            // test002@gmail.comが2で攻撃する
            //**************************************************
            function doAttackCommandPhase2_client1(data) {
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doDefenseCommandPhase2_client1);
            }

            function doAttackCommandPhase2_client2(data) {
                client2.emit('command', {
                    method : 'atack',
                    param : {
                        battery : 5
                    }
                });
                client2.once('resp', doDefenseCommandPhase2_client2);
            }

            //**************************************************
            // デフェンスコマンドフェイズ2
            // test005@gmail.comが1で防御する
            //**************************************************
            function doDefenseCommandPhase2_client1(data) {
                client1.emit('command', {
                    method : 'defenth',
                    param : {
                        battery : 0
                    }
                });
                client1.once('resp', doDamagePhase2_client1);
            }

            function doDefenseCommandPhase2_client2(data) {
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doDamagePhase2_client2);
            }

            //**************************************************
            // ダメージフェイズ2
            //**************************************************
            function doDamagePhase2_client1(data){
                client1.emit('command', {
                    method : 'ok'
                });
                client1.once('resp', doGameEndPhase_client1);
            }

            function doDamagePhase2_client2(data){
                client2.emit('command', {
                    method : 'ok'
                });
                client2.once('resp', doGameEndPhase_client2);
            }

            //**************************************************
            // ゲーム終了
            //**************************************************
            function assertOfGameEndPhase(data){
                var expect = {
                    phase : 'gameEnd',
                    winner : 'test002@gmail.com',
                    statusArray : {
                        'test002@gmail.com' : {
                            hp : 4700,
                            battery : 0,
                            active : 0,
                            skillPoint : 1,
                            overHeatFlag : false,
                            specialPoint : 0
                        },
                        'test005@gmail.com' : {
                            hp : -3200,
                            battery : 5,
                            active : 3500,
                            skillPoint : 1,
                            overHeatFlag : false,
                            specialPoint : 0
                        }
                    }
                };
                assert.deepEqual(data,expect,'ゲーム終了判定のオブジェクトが正しい');
            }

            function doGameEndPhase_client1(data) {
                assertOfGameEndPhase(data);
                tc.completeClient('test005@gmail.com');
            }

            function doGameEndPhase_client2(data) {
                assertOfGameEndPhase(data);
                tc.completeClient('test002@gmail.com');
            }
        });
    });
});
