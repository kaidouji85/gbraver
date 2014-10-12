describe('serverクラスのテスト', function() {
    var SERVER_PORT = 4004;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var app;
    var server = require('../server.js');
    var armdozerList = {};
    armdozerList['granBraver'] = {
        armdozerId : 'granBraver',
        name : 'グランブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3000,
        speed : 110,
        weapons : {
            1 : {
                name : 'バスターナックル',
                power : 1000
            },
            2 : {
                name : 'バスターナックル',
                power : 1200
            },
            3 : {
                name : 'バスターナックル',
                power : 1500
            },
            4 : {
                name : 'バスターナックル',
                power : 1700
            },
            5 : {
                name : 'バスターナックル',
                power : 2000
            }
        }
    };

    beforeEach(function() {
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app
        });
        Server.onGetPlayerData(testPlayerData.getPlayerData);
        Server.onGetCharacterInfo(function(armdozerId,fn){
            fn(null,armdozerList[armdozerId]);
        });
    });

    afterEach(function() {
        app.close();
    });

    it('キャラクター情報を取得できる',function(done){
        var client = io.connect(SERVER_URL, option);
        client.emit('auth',{
            userId : 'test001@gmail.com'
        });
        client.once('successAuth',function(){
            getCharacterList();
        });

        function getCharacterList(){
            client.emit('getCharacterInfo',{
                armdozerId : 'granBraver'
            });
            client.once('successGetCharacterInfo',function(data){
                var expect = armdozerList['granBraver'];
                assert.deepEqual(data,expect,'キャラクター情報が取得できる。');
                done();
            });
        }
    });
});