//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../server.js');
    var dbMock = require('./dbMock.js')();

    var app;
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app
        });
        testServer.onGetUserData(dbMock.getUserData);
        testServer.onGetPlayerData(dbMock.getPlayerData);
    });

    afterEach(function() {
        app.close();
    });

    describe('ルーム情報取得',function(){
        it('全ルームに誰も入室していない',function(done){
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

        it('ルーム3に1人入室',function(done){
            var client;

            enterRoomByTest002();
            function enterRoomByTest002(){
                enterRoom('test002@gmail.com',3,connectByTest001);
            }

            function connectByTest001() {
                client = io(SERVER_URL, option);
                client.on('connect',doAuth);
            }

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
                    '3' : ['test002@gmail.com'],
                    '4' : []
                };
                assert.deepEqual(data,expect,'ルーム情報が正しい');
                done();
            }
        });

        it('ルーム1に2人入室',function(done){
            var client;

            enterRoomByTest002();
            function enterRoomByTest002(){
                enterRoom('test002@gmail.com',1,enterRoomByTest003);
            }

            function enterRoomByTest003() {
                enterRoom('test003@gmail.com',1,connectByTest001);
            }

            function connectByTest001() {
                client = io(SERVER_URL, option);
                client.on('connect',doAuth);
            }

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
                    '1' : ['test002@gmail.com','test003@gmail.com'],
                    '2' : [],
                    '3' : [],
                    '4' : []
                };
                assert.deepEqual(data,expect,'ルーム情報が正しい');
                done();
            }
        });

        it('ルーム1、2に一人ずつ入室',function(done){
            var client;

            enterRoomByTest002();
            function enterRoomByTest002(){
                enterRoom('test002@gmail.com',1,enterRoomByTest003);
            }

            function enterRoomByTest003() {
                enterRoom('test003@gmail.com',2,connectByTest001);
            }

            function connectByTest001() {
                client = io(SERVER_URL, option);
                client.on('connect',doAuth);
            }

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
                    '1' : ['test002@gmail.com'],
                    '2' : ['test003@gmail.com'],
                    '3' : [],
                    '4' : []
                };
                assert.deepEqual(data,expect,'ルーム情報が正しい');
                done();
            }
        });


        function enterRoom(userId, roomId, fn){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : userId
                });
                client.once('successAuth',enter);
            }

            function enter(){
                client.emit('enterRoom',{
                    roomId : roomId
                });
                client.once('succesEnterRoom',fn);
            }
        }
    });
});