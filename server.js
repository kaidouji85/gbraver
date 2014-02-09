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
    var roomObject = {};
    for(var i=0; i<100; i++){
        roomObject[i] = {
            user : {},
            battle : null
        };
    }
    
    var getUserData;
    io.onGetUserData = function(fn){
        getUserData = fn;
    };
    
    io.sockets.on('connection', function(socket) {
        socket.on('enterRoom',function(data){
            var roomId = data.roomId;
            var userId = data.userId;
            
            socket.join(roomId);
            getUserData(userId,function(err,data){
                roomObject[roomId].user[userId] = data;
                socket.emit('succesEnterRoom');
                if(io.sockets.clients(roomId).length >= 2){
                    var respData = roomObject[roomId].user;
                    io.sockets.in(roomId).emit('gameStart',respData);
                }
            });
        });
    });

    return io;
};

module.exports = server;
