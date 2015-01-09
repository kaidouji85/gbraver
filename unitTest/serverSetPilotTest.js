//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('パイロット選択',function(){
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../server.js');
    var dbMock = require('./dbMock.js')();

    var app;
    var option;
    var Server;

    beforeEach(function(){
        option = {
            'forceNew' : true
        };
        app = require('http').createServer().listen(SERVER_PORT);
        Server = server({
            httpServer : app,
            dao : dbMock
        });
    });

    afterEach(function() {
        app.close();
    });

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
            dbMock.setPilotId = updatePilotId;
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

    it('未ログインでパイロット選択をするとエラーが出る',function(done){
        var client = io.connect(SERVER_URL, option);

        selectPilot();
        function selectPilot(){
            client.emit('setPilot',{
                pilotId : 'iori'
            });
            client.once('noLoginError', assertOfNoLoginError);
        }

        function assertOfNoLoginError(data){
            assert.equal(data,'ログインが完了していません。','エラーメッセージが正しい');
            done();
        }
    });
});