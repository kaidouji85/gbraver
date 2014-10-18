//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト',function(){
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');

    var option;
    var Server;

    var userData = {
        'test001@gmail.com' : {
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver'},
        'test002@gmail.com' : {
            userId : 'test002@gmail.com',
            armdozerId : 'landozer'}
    };

    beforeEach(function(){
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });

        Server.onGetUserData(function(userId,fn){
            fn(null,userData[userId]);
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
    });

    afterEach(function() {
        app.close();
    });

    describe('パイロット選択',function(){
        it('パイロット選択に成功する',function(done){
            var client = io.connect(SERVER_URL, option);
            client.emit('auth', {
                userId : 'test001@gmail.com'
            });
            client.once('successAuth',selectPilot);

            function selectPilot(){
                client.emit('setPilot',{
                    pilotId : 'iori'
                });
                Server.onSetPilotId(updatePilotId);
            }

            function updatePilotId(userId,pilotId,fn) {
                assert.equal('test001@gmail.com',userId,'ユーザIDが正しい');
                assert.equal('iori', pilotId, 'パイロットIDが正しい');
                fn(null,true);
                client.once('successSetPilot', function() {
                    done();
                });
            }

        });
    });
});