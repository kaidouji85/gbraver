describe('serverクラスのテスト',function(){
    var SERVER_PORT = 3003;
    var SERVER_URL = 'http://localhost';
    
    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT); 
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
    
    before(function(){
        option = {
            'force new connection' : true,
            port : SERVER_PORT
        };
        Server = server({
            httpServer : app
        });
        
        Server.onGetUserData(function(userId,fn){
            fn(null,userData[userId]);
        });
        Server.onGetPlayerData(function(userId, fn) {
            var userData = testPlayerData.getPlayerData(userId);
            fn(null, userData);
        });
    });
    
    describe('キャラクター選択',function(){
        it('キャラクター選択に成功する',function(done){
            var client = io.connect(SERVER_URL, option);
            client.emit('auth', {
                userId : 'test001@gmail.com'
            });
            
            client.once('successAuth',function(){
                selectArmdozer();
            });
            
            function selectArmdozer(){
                client.emit('setArmdozer',{
                    armdozerId : 'landozer'
                });
                Server.onSetArmdozerId(updateArmdozerId);
            }

            function updateArmdozerId(userId,armdozerId,fn) {
                assert.equal('test001@gmail.com',userId,'ユーザIDが正しい');
                assert.equal('landozer', armdozerId, 'アームドーザIDが更新されている');
                fn(null,true);
                client.once('successSetArmdozer', function() {
                    done();
                });
            }

        });
    });
});