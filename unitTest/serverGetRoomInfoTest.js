//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');

    var app;
    var server = require('../server.js');
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app
        });
        testServer.onGetPlayerData(testPlayerData.getPlayerData);
    });

    afterEach(function() {
        app.close();
    });

    describe('ルーム情報取得',function(){
        it('誰も入室していない',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test001@gmail.com'
                });
                client.once('successAuth',getRoomInfo);
            }

            function getRoomInfo(){
                client.emit('getRoomInfo');
                client.once('successGetRoomInfo',assertGetRoomInfo);
            }

            function assertGetRoomInfo(data) {
                var expect = {
                    '0' : [],
                    '1' : [],
                    '2' : [],
                    '3' : [],
                    '4' : []
                };
                assert.deepEqual(data,expect,'ルーム情報が正しい');
                done();
            }
        });
    });
});