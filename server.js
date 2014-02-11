var battle = require('./battle.js');

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
                    //ゲームスタート
                    var respData = roomObject[roomId].user;
                    io.sockets.in(roomId).emit('gameStart',respData);
                    
                    //戦闘クラスの初期化
                    /*
                    var statusArray = {};
                    for(var i in roomObject[roomId].user){
                        var userId = roomObject[roomId].user[i].userId;
                        var status = roomObject[roomId].user[i].status;
                        statusArray[userId] = status;
                    }
                    roomObject[roomId].battle = battle({
                        sattusArray : statusArray
                    });
                    */
                    
                    //ウェイトフェイズ実行
                    //var waitPhaseResult = roomObject[roomId].battle.doWaitPhase();
                    //io.sockets.in(roomId).emit('waitPhase',waitPhaseResult);
                }
            });
        });
    });

    return io;
};

module.exports = server;
