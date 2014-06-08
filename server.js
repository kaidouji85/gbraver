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
     * 戦闘用プレイヤー情報取得
     * この関数の実装は外部で行う
     * @param {String} useId
     * @param {Function} callback(err,data)
     */
    var getPlayerData;
    io.onGetPlayerData = function(fn) {
        getPlayerData = fn;
    };

    /**
     * ユーザ情報取得
     * この関数の実装は外部で行う
     * @param {String} useId
     * @param {Function} callback(err,data)
     */    
    var getUserData;
    io.onGetUserData = function(fn){
        getUserData = fn;
    };

    /**
     * ユーザ情報更新
     * この関数の実装は外部で行う
     * @param {String} userId
     * @param {String} arndozerId
     * @param {Function} callback(err,result)
     */    
    var setArmdozerId;
    io.onSetArmdozerId = function(fn){
        setArmdozerId = fn;
    };

    io.sockets.on('connection', function(socket) {
        socket.gbraverInfo = {
            userId : null,
            roomId : null
        };

        socket.on('auth',function(data){
            var L_userId = data.userId;
            getPlayerData(L_userId, function(err, data) {
                if(!err){
                    socket.gbraverInfo.userId = L_userId;
                    socket.emit('successAuth');
                } else {
                    var message = L_userId + 'は存在しないユーザです';
                    socket.emit('authError',message);
                }
            });
        });
        
        socket.on('enterRoom', function(data) {
            var L_roomId = data.roomId;
            isLogin();

            function isLogin(loginInfo){
                if(socket.gbraverInfo.userId!==null){
                    isAlreadyEnterRoom();
                } else {
                    socket.emit('enterRoomError', 'ユーザ認証が完了していません。');
                }
            }
            
            function isAlreadyEnterRoom(){
                if (socket.gbraverInfo.roomId===null) {
                    socket.gbraverInfo.roomId = L_roomId;
                    prepareBattle();
                } else {
                    socket.emit('enterRoomError', 'このコネクションは既に入室しています。');
                }
            }
            
            function prepareBattle() {
                getPlayerData(socket.gbraverInfo.userId, function(err, userData) {
                    socket.join(socket.gbraverInfo.roomId);
                    socket.emit('succesEnterRoom');
                    roomArray[socket.gbraverInfo.roomId].addUser(userData);
                    if (roomArray[socket.gbraverInfo.roomId].isGameStart()) {
                        roomArray[socket.gbraverInfo.roomId].initBattle();
                        io.sockets. in (socket.gbraverInfo.roomId).emit('gameStart', roomArray[socket.gbraverInfo.roomId].getUsers());
                    }
                });
            }
        });

        socket.on('command', function (data) {
            var method = data.method;
            var param = data.param;
            roomArray[socket.gbraverInfo.roomId].setCommand(socket.gbraverInfo.userId, method, param);
            if (roomArray[socket.gbraverInfo.roomId].isInputFinish()) {
                if (roomArray[socket.gbraverInfo.roomId].isGameEnd()) {
                    dissolveRoom(socket.gbraverInfo.roomId);
                } else {
                    var ret = roomArray[socket.gbraverInfo.roomId].executePhase();
                    io.sockets.in(socket.gbraverInfo.roomId).emit('resp', ret);
                }
            }
        });

        function dissolveRoom(P_roomId){
            roomArray[P_roomId] = room();

            var clients = io.sockets.clients(P_roomId);
            for (var i in clients) {
                clients[i].leave(P_roomId);
                clients[i].gbraverInfo.roomId = null;
                clients[i].emit('dissolveRoom');
            }
        }

        socket.on('disconnect', function(data) {
            if(socket.gbraverInfo.roomId !== null){
                dissolveRoom(socket.gbraverInfo.roomId);
            }
        });

        socket.on('setArmdozer', function (data) {
            var armdozerId = data.armdozerId;
            setArmdozerId(socket.gbraverInfo.userId, armdozerId, function (err, result) {
                if (result === true) {
                    socket.emit('successSetArmdozer', {});
                }
            });
        });
    });

    return io;
};

module.exports = server;
