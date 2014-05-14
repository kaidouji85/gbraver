describe('serverクラスのテスト', function() {
    var SERVER_PORT = 3001;
    var SERVER_URL = 'http://localhost'; 
    
    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT); 
    var server = require('../server.js');
    
    var option;
    var Server;
    
    before(function(){
        option = {
            'force new connection' : true,
            port : SERVER_PORT
        };
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(function(userId, fn) {
            var userData = testPlayerData.getPlayerData(userId);
            if(userData===null){
                fn(new Error('user not exist.'), null);
            } else {
                fn(null, userData);
            }
        });        
    });
    
    after(function() {
        app.close();
    });
    
    describe('認証系テスト',function(){
        it('存在するユーザなので認証に成功する',function(done){
            var client = io.connect(SERVER_URL, option);
            client.emit('auth', {
                userId : 'test001@gmail.com'
            });
            client.on('successAuth', function() {
                done();
            });
        });
        
        it('存在しないユーザなので認証に失敗する',function(done){
            var client = io.connect(SERVER_URL, option);
            client.emit('auth', {
                userId : 'nainaiUser@gmail.com'
            });
            client.on('authError', function(message) {
                assert.equal(message,'nainaiUser@gmail.comは存在しないユーザです');
                done();
            });            
        });
    });
}); 