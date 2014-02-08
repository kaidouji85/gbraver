var assert = require('chai').assert;

describe('socket.io clientの学習テスト', function() {
    it('サーバとクライアントを接続する', function(done) {
        //サーバ
        var app = require('http').createServer().listen(3000);
        var io = require('socket.io').listen(app);
        io.sockets.on('connection', function(socket) {
            socket.emit('news', {
                hello : 'world'
            });
            socket.on('my other event', function(data) {
                console.log(data);
                done();
            });
        });

        //クライアント
        var client = require('socket.io-client').connect('http://localhost',{
            'force new connection' : true, //別々のコネクションとして認識させるために必要
            port : 3000
        });

        client.on('news', function(data) {
            console.log(data);
            client.emit('my other event', {
                my : 'data'
            });
        });
    });
});
