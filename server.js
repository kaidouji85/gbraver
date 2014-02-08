/**
 * ゲームサーバ
 * @param spec {Object}
 * {
 *     httpServer : httpサーバオブジェクト
 * }
 * @param my {Object}
 */
function server(spec, my) {
    var app = spec.httpServer;
    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function(socket) {
        socket.on('enterRoom',function(data){
            var roomId = data.roomId;
            var userId = data.userId;
            
            socket.join(roomId);
            socket.emit('succesEnterRoom');
            console.log('room ' +  roomId +' in ' + io.sockets.clients(roomId).length);
            if(io.sockets.clients(roomId).length >= 2){
                io.sockets.in(roomId).emit('gameStart');
            }
        });
    });
    
    return io;
};

module.exports = server;
