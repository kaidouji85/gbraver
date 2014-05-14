//TODO : テストコードだけを先攻して作成した
/*
describe('serverクラスのテスト',function(){
    var SERVER_PORT = 3003;
    var SERVER_URL = 'http://localhost';

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT); 
    var server = require('../server.js');
    
    var option;
    var Server;
    
    var userData = {
        'take' : {
            userId : 'take',
            armdozerId : 'landozer'},
        'uchi' : {
            userId : 'uchi',
            armdozerId : 'granBraver'}        
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
                client,emit('setArmdozer',{
                    armdozerId : 'granbraver'
                });
                client.once('successSetArmdozer',function(){
                    done();
                });
            }
        });
    });
});
*/