describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;
    
    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');
    
    var option;
    var Server;
    
    beforeEach(function(){
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
    });
    
    afterEach(function() {
        app.close();
    });
    
    describe('認証系テスト',function(){
        it('存在するユーザなので認証に成功する',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',function(){
                client.emit('auth', {
                    userId : 'test001@gmail.com'
                });
                client.on('successAuth', function(data) {
                    var expect = {
                        armdozerPict : 'GranBraver.PNG'
                    };
                    assert.deepEqual(data,expect,'選択しているアームドーザの画像名が正しい');
                    done();
                });
            });

        });

        it('存在しないユーザなので認証に失敗する',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',function(){
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
}); 