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
                    initBattle(roomId);
                    
                    //ウェイトフェイズ実行
                    console.log('test doWaitPhase');
                    console.log(roomObject[roomId].battle);
                    var waitPhaseResult = roomObject[roomId].battle.doWaitPhase();
                    //conosle.log(waitPhaseResult);
                    //io.sockets.in(roomId).emit('waitPhase',waitPhaseResult);
                }
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
            var status = roomObject[roomId].user[i].status;
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
