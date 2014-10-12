describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
        Server.onGetCharacterList(function(fn){
            var characterList = [
                {name:'グランブレイバー',id:'granBraver'},
                {name:'ランドーザ',id:'landozer'}
            ];
            fn(null,characterList);
        });
    });

    afterEach(function() {
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
                    {name:'グランブレイバー',id:'granBraver'},
                    {name:'ランドーザ',id:'landozer'}
                ];
                assert.deepEqual(data,expect,'キャラクターリストが取得できる。');
                done();
            });
        }
    });
});