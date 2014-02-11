var battle = require('./battle.js');

/**
 * ゲームサーバ
 * @param spec {Object}
 * {
 *     httpServer : httpサーバオブジェクト
 *     logLevel : socket.ioのログレベル
 * }
 * @param my {Object}
 */
function server(spec, my) {
    var app = spec.httpServer;
    var logLevel = spec.logLevel || 1;
    var io = require('socket.io').listen(app,{'log level':logLevel});
    var roomObject = {};
    for(var i=0; i<100; i++){
        roomObject[i] = {
            user : {},
            battle : null,
            respBuffer : {}
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
                
                socket.on('ready', function() {
                    roomObject[roomId].respBuffer[userId] = 'ready';
                    if (Object.keys(roomObject[roomId].respBuffer).length == 2) {
                        roomObject[roomId].respBuffer = {};
                        initBattle(roomId);
                        var waitPhaseResult = roomObject[roomId].battle.doWaitPhase();
                        io.sockets.in(roomId).emit('waitPhase',waitPhaseResult);
                    }
                }); 

            });
        });
    });
    
    /**
     * 戦闘クラスの初期化 
     * @param {Integer} roomId
     * @return void
     */
    function initBattle(roomId) {
        var statusArray = {};
        for (var i in roomObject[roomId].user) {
            var nowUserId = roomObject[roomId].user[i].userId;
            var status =  roomObject[roomId].user[i].status;
            status.active = 0;
            status.battery = 5;
            statusArray[nowUserId] = status;
        }
        roomObject[roomId].battle = battle({
            statusArray : statusArray
        });
    }
    
    return io;
};

module.exports = server;
