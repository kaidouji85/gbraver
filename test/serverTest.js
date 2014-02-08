var assert = require('chai').assert;
var io = require('socket.io-client');
const SERVER_PORT = 3000;

describe('serverクラスのテスト', function(){
    var Server;
    var clients = [];
    
    before(function(){
        var app = require('http').createServer().listen(3000);
        var server = require('../server.js');
        Server = server({
            httpServer : app
        });
        
        for(var i=0; i<3; i++){
            clients[i] = io.connect('http://localhost', {
                'force new connection' : true,
                port : 3000
            });
        }
    });

    describe('入室正常系',function(){
        it('1人目が入室したらサーバから「succesEnterRoom」が返される',function(done){
            clients[0] = io.connect('http://localhost',{
                'force new connection' : true,
                port : 3000
            });
            
            clients[0].emit('enterRoom',{
                roomId : 1,
                userId : 1
            });
            clients[0].on('succesEnterRoom',function(){
                done();
            });
        });
        
        it('入室したらサーバから入室成功メッセージが返される',function(done){
            console.log('test dayon');
            console.log(clients[1]);
            clients[1].emit('enterRoom',{
                roomId : 1,
                userId : 1
            });
            
            clients[1].on('gameStart',function(){
                done(); 
            });
        });
    });
});