var battle = require('./battle.js');
var room = require('./room.js');
/**
 * ゲームサーバ
 * @param spec {Object}
 *     httpServer : httpサーバオブジェクト
 *     logLevel : socket.ioのログレベル
 * @param my {Object}
 */
function server(spec, my) {
    var app = spec.httpServer;
    var logLevel = spec.logLevel || 1;
    var io = require('socket.io').listen(app, {
        'log level' : logLevel
    });
    var roomArray = {};
    for(var i = 0; i < 100; i++){
        roomArray[i] = room();
    }

    /**
     * ユーザ情報取
     * この関数の実装は外部で行う
     * @param {String} useId
     * @param {Function} callback(err,data)
     */
    var getUserData;
    io.onGetUserData = function(fn) {
        getUserData = fn;
    };

    io.sockets.on('connection', function(socket) {
        socket.on('enterRoom', function(data) {
            var roomId = data.roomId;
            var userId = data.userId;
            socket.get('loginInfo', function(err, data) {
                if (!data) {
                    var loginInfo = {
                        userId : userId,
                        roomId : roomId
                    };
                    socket.set('loginInfo', loginInfo, function() {
                        getUserData(userId, function(err, data) {
                            socket.join(roomId);
                            socket.emit('succesEnterRoom');
                            roomArray[roomId].addUser(data);
                            if(roomArray[roomId].isGameStart()){
                                io.sockets.in(roomId).emit('gameStart', roomArray[roomId].getUsers());
                                roomArray[roomId].initBattle();
                            }
                        });
                    });
                } else {
                    socket.emit('enterRoomError', 'このコネクションは既に入室しています。');
                }
            });
        });

        socket.on('command', function(data) {
            socket.get('loginInfo', function(err, loginInfo) {
                var roomId = loginInfo.roomId;
                var userId = loginInfo.userId;
                var method = data.method;
                var param = data.param;
                roomArray[roomId].setCommand(userId,method,param);
                if(roomArray[roomId].isInputFinish()){
                    var ret = roomArray[roomId].executePhase();
                    io.sockets.in(roomId).emit('resp', ret);
                }
            });
        });
    });

    return io;
};

module.exports = server;
