describe('serverクラスのテスト', function() {
    var SERVER_PORT = 4003;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app = require('http').createServer().listen(SERVER_PORT);
    var server = require('../server.js');

    before(function() {
        option = {
            'forceNew' : true
        };
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
        Server.onGetCharacterList(function(fn){
            var characterList = [
                'granBraver',
                'landozer'
            ];
            fn(null,characterList);
        });
    });

    after(function() {
        app.close();
    });

    it('キャラクターリストを取得できる',function(done){
        var client = io.connect(SERVER_URL, option);
        client.emit('auth',{
            userId : 'test001@gmail.com'
        });
        client.once('successAuth',function(){
            getCharacterList();
        });

        function getCharacterList(){
            client.emit('getCharacterList');
            client.once('successGetCharacterList',function(data){
                var expect = [
                    'granBraver',
                    'landozer'
                ];
                assert.deepEqual(data,expect,'キャラクターリストが取得できる。');
                done();
            });
        }
    });
});