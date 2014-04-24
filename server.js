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
        socket.on('auth',function(data){
            var userId = data.userId;
            getUserData(userId, function(err, data) {
                if(!err){
                    var loginInfo = {
                        userId : userId,
                        roomId : null
                    };
                    socket.set('loginInfo', loginInfo, function() {
                        socket.emit('successAuth');
                    });
                } else {
                    socket.emit('authError');
                }
            });
        });
        
        socket.on('enterRoom', function(data) {
            var roomId = data.roomId;
            socket.get('loginInfo', function(err, loginInfo) {
                if (loginInfo.roomId===null) {
                    loginInfo.roomId = roomId;
                    socket.set('loginInfo', loginInfo, function() {
                        var userId = loginInfo.userId;
                        getUserData(userId, function(err, userData) {
                            socket.join(roomId);
                            socket.emit('succesEnterRoom');
                            roomArray[roomId].addUser(userData);
                            if(roomArray[roomId].isGameStart()){
                                roomArray[roomId].initBattle();
                                io.sockets.in(roomId).emit('gameStart', roomArray[roomId].getUsers());
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

        socket.on('disconnect', function(data) {
            socket.get('loginInfo', function(err, data) {
                var roomId = data.roomId;
                socket.leave(roomId);
                var clients = io.sockets.clients(roomId);
                if (clients.length === 0) {
                    roomArray[roomId] = room();
                } else {
                    for (var i in clients) {
                        clients[i].disconnect();
                    }
                }
            });
        });
    });

    return io;
};

module.exports = server;
