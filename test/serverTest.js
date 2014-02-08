var assert = require('chai').assert;
const SERVER_PORT = 3000;

describe('serverクラスのテスト', function(){
    var Server;
    
    before(function(){
        //ダミーWebサーバ
        var fs = require('fs');
        var app = require('http').createServer(handler);
        app.listen(SERVER_PORT);
        function handler(req, res) {
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        
        var server = require('../server.js');
        Server = server({
            httpServer : app
        });
    });
        
    describe('入室',function(){
        it('入室したらサーバから入室成功メッセージが返される',function(done){
            var io = require('socket.io-client');
            var socket = io.connect('http://localhost',{
                'force new connection' : true,
                port : 3000
            });
            
            socket.emit('enterRoom',{
                roomId : 1,
                userId : 1
            });
            socket.on('succesEnterRoom',function(){
                done();
            });
        });
        
        it('二人が同じ部屋に入室したらゲーム開始メッセージが送信される',function(done){
            var io = require('socket.io-client');
            var socket1 = io.connect('http://localhost',{
                'force new connection' : true,
                port : 3000
            });
            var socket2 = io.connect('http://localhost',{
                'force new connection' : true,
                port : 3000
            });            
            
            socket1.emit('enterRoom',{
                roomId : 2,
                userId : 1
            });
            socket2.emit('enterRoom',{
                roomId : 2,
                userId : 2
            });
              
            socket1.on('gameStart',function(data){
                socket2.on('gameStart',function(data){
                    done();
                });
            });
        });
    });
});