//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('一人用モード開始テスト', function () {
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:' + SERVER_PORT;

    var testEnemyRoutineDefine = require('./../../testData/testEnemyRoutineDefine.js');
    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var http = require('http');
    var server = require('../../../server/server.js');
    var dbMock = require('./../../testData/dbMock.js')();

    var app;
    var testServer;
    var option = {
        'forceNew': true
    };

    beforeEach(function () {
        app = http.createServer().listen(SERVER_PORT);
        testServer = server({
            httpServer: app,
            dao: dbMock
        });
        testServer.onGetAttackRoutine(testEnemyRoutineDefine.getAttackRoutine);
        testServer.onGetDefenseRoutine(testEnemyRoutineDefine.getDefenseRoutine);
    });

    afterEach(function () {
        app.close();
    });

    it('未ログイン状態で開始するとエラーが出る',function(done){
        var client = io(SERVER_URL, option);
        client.on('connect', startSinglePlay);

        function startSinglePlay() {
            client.emit('startSinglePlay', {
                enemyId: 'landozer',
                routineId: 'zero'
            });
            client.once('noLoginError', assertOfNoLoginError);
        }

        function assertOfNoLoginError(data){
            assert.equal(data,'ログインが完了していません。','エラーメッセージが正しい');
            done();
        }
    })
});