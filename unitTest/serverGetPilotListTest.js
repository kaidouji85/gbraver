//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('serverクラスのテスト', function() {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var testPlayerData = require('./testPlayerData.js');
    var testArmdozerData = require('./testArmdozerData.js');
    var testEnemyRoutineDefine = require('./testEnemyRoutineDefine.js');
    var testPilotData = require('./testPilotData.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');

    var app;
    var server = require('../server.js');
    var testServer;
    var option = {
        'forceNew' : true
    };

    beforeEach(function() {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer : app
        });
        testServer.onGetPlayerData(testPlayerData.getPlayerData);
        testServer.onGetCharacterInfo(testArmdozerData.getArmdozerData);
        testServer.onGetPilotList(testPilotData.getPilotList);
    });

    afterEach(function() {
        app.close();
    });

    describe('パイロットデータの取得',function(){
        it('全パイロットデータが取得できる',function(done){
            var client = io(SERVER_URL, option);
            client.on('connect',doAuth);

            function doAuth() {
                client.emit('auth',{
                    userId : 'test003@gmail.com'
                });
                client.once('successAuth',getPilotData);
            }

            function getPilotData() {
                client.emit('getPilotList',{});
                client.once('successGetPilotList',assertOfPilotData);
            }

            function assertOfPilotData(data){
                var expect = [
                    {
                        id : 'kyoko',
                        name : '恭子',
                        pict : 'kyoko.png',
                        shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                        type : 'quickCharge',
                        battery : 3
                    },
                    {
                        id : 'akane',
                        name : '茜',
                        pict : 'akane.png',
                        shout : 'まだまだ、勝負はこれからよ。',
                        type : 'quickCharge',
                        battery : 3
                    },
                    {
                        id : 'iori',
                        name: '伊織',
                        pict: 'iori.png',
                        shout: 'この一撃に、全てを掛ける！！',
                        type: 'quickCharge',
                        battery: 3
                    }
                ];
                assert.deepEqual(expect,data,'パイロットデータが正しい');
                done();
            }
        });
    });
});