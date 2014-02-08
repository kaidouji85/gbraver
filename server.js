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
            socket.emit('succesEnterRoom');
        });
    });
    
    return io;
};

module.exports = server;
