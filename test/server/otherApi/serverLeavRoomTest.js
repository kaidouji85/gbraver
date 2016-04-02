//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../../../server/server.js');
    var http = require('http');
    var dbMock = require('./../testData/dbMock.js')();

    var app;
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app,
            dao : dbMock
        });
    });

    afterEach(function() {
        app.close();
    });

    describe('退室系テスト',function(){
        it('入室後に退室する',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test001@gmail.com'
                });
                client.once('successAuth',enterRoom);
            }

            function enterRoom() {
                client.emit('enterRoom',{
                    roomId : 0
                });
                client.on('succesEnterRoom',leaveRoom);
            }

            function leaveRoom() {
                client.emit('leaveRoom');
                client.on('successLeaveRoom',done);
            }
        });
    });
});