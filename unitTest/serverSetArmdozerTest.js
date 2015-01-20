//TODO : socket.ioコネクション処理を1.0推奨の非同期方式にする
describe('キャラクター選択',function(){
    var SERVER_PORT = process.env.PORT || 3000;
    var SERVER_URL = 'http://localhost:'+SERVER_PORT;

    var assert = require('chai').assert;
    var io = require('socket.io-client');
    var server = require('../server/server.js');
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
            dbMock.setArmdozerId = updateArmdozerId;
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

    it('未ログインでキャラクター選択をするとエラーが出る',function(done){
        var client = io.connect(SERVER_URL, option);

        selectArmdozer();
        function selectArmdozer(){
            client.emit('setArmdozer',{
                armdozerId : 'landozer'
            });
            client.once('noLoginError', assertOfNoLoginError);
        }

        function assertOfNoLoginError(data){
            assert.equal(data,'ログインが完了していません。','エラーメッセージが正しい');
            done();
        }
    });
});