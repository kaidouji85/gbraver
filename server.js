var battle = require('./battle.js');
var room = require('./room.js');
var enemyRoutineBase = require('./enemyRoutineBase.js');

/**
 * ゲームサーバ
 * @param spec {Object}
 *     httpServer : httpサーバオブジェクト
 *     logLevel : socket.ioのログレベル
 *     dao : dao
 * @param my {Object}
 */
function server(spec, my) {
    var NONE_PLAYER_CHARACTOR_NAME = 'nonePlayerCharacter';
    var app = spec.httpServer;
    var logLevel = spec.logLevel || 1;
    var dao = spec.dao;
    var io = require('socket.io').listen(app, {
        'log level' : logLevel
    });
    var roomArray = {};
    for(var i = 0; i < 100; i++){
        roomArray[i] = room();
    }

    /**
     * CPU攻撃思ルーチン取得関数
     * この関数の実装は外部で行う
     * @param {String} routineId
     * @return attackRoutineFunction
     */
    var getAttackRoutine;
    io.onGetAttackRoutine = function(fn){
        getAttackRoutine = fn;
    }

    /**
     * CPU防御思ルーチン取得関数
     * この関数の実装は外部で行う
     * @param {String} routineId
     * @return defenseRoutineFunction
     */
    var getDefenseRoutine;
    io.onGetDefenseRoutine = function(fn){
        getDefenseRoutine = fn;
    }

    io.sockets.on('connection', function(socket) {
        socket.gbraverInfo = {
            userId : null,
            roomId : null,
            singlePlayRoom : null,
            enemyRoutineBase : null
        };

        socket.isLogin = function(){
            if(socket.gbraverInfo.userId===null){
                return false;
            }
            return true;
        }

        socket.on('auth',function(data){
            var L_userId = data.userId;
            dao.getUserData(L_userId, function(err, userData) {
                var sendData = {
                    armdozerId : userData.armdozerId,
                    pilotId : userData.pilotId
                };
                socket.gbraverInfo.userId = L_userId;
                socket.emit('successAuth',sendData);
            });
        });

        socket.on('enterRoom', function(data) {
            var L_roomId = data.roomId;
            checkAlreadyLogin();

            function checkAlreadyLogin(){
                if(socket.isLogin()){
                    checkRoomUsersCapacity();
                } else {
                    socket.emit('noLoginError', 'ログインが完了していません。');
                }
            }

            function checkRoomUsersCapacity(){
                var userNum = roomArray[L_roomId].getUserIdList().length;
                if(userNum < 2){
                    enterRoom();
                } else {
                    socket.emit('enterRoomError', '対戦中のルームには入室できません。');
                }
            }

            function enterRoom(){
                if (socket.gbraverInfo.roomId===null) {
                    socket.gbraverInfo.roomId = L_roomId;
                    prepareBattle();
                } else {
                    socket.emit('enterRoomError', 'このコネクションは既に入室しています。');
                }
            }

            function prepareBattle() {
                dao.getPlayerData(socket.gbraverInfo.userId, function(err, userData) {
                    socket.join(socket.gbraverInfo.roomId);
                    socket.emit('succesEnterRoom');
                    roomArray[socket.gbraverInfo.roomId].addUser(userData);
                    if (roomArray[socket.gbraverInfo.roomId].isGameStart()) {
                        roomArray[socket.gbraverInfo.roomId].initBattle();
                        io.sockets.in(socket.gbraverInfo.roomId).emit('gameStart', roomArray[socket.gbraverInfo.roomId].getUsers());
                    }
                });
            }
        });

        socket.on('startSinglePlay',function(data){
            checkAlreadyLogin();
            function checkAlreadyLogin() {
                if (socket.isLogin()) {
                    getPlayerData();
                } else {
                    socket.emit('noLoginError', 'ログインが完了していません。');
                }
            }

            function getPlayerData(){
                var enemyId = data.enemyId;
                var routineId = data.routineId;
                var attackRoutine = getAttackRoutine(routineId);
                var defenseRoutine = getDefenseRoutine(routineId);
                socket.gbraverInfo.singlePlayRoom = room();
                socket.gbraverInfo.enemyRoutineBase = enemyRoutineBase({
                    attackRoutine : attackRoutine,
                    defenseRoutine : defenseRoutine
                });

                dao.getPlayerData(socket.gbraverInfo.userId, function(err, userData) {
                    socket.gbraverInfo.singlePlayRoom.addUser(userData);
                    dao.getEnemyData(enemyId,'kyoko',enterRoomByNPC);//TODO パイロットIDもクライアント側で指定できるようにする
                });
            }

            function enterRoomByNPC(err,enemyData){
                socket.gbraverInfo.singlePlayRoom.addUser(enemyData);
                socket.gbraverInfo.singlePlayRoom.initBattle();
                socket.gbraverInfo.enemyRoutineBase.setRespData(null);
                socket.emit('gameStart',socket.gbraverInfo.singlePlayRoom.getUsers());
            }
        });

        socket.on('command', function (data) {
            var method = data.method;
            var param = data.param;

            if(socket.gbraverInfo.roomId !== null){
                commandForTwoPlay(method, param);
            } else if(socket.gbraverInfo.singlePlayRoom !== null) {
                commandForSinglePlay(method,param);
            }
        });

        function commandForTwoPlay(method,param) {
            roomArray[socket.gbraverInfo.roomId].setCommand(socket.gbraverInfo.userId, method, param);
            if (roomArray[socket.gbraverInfo.roomId].isInputFinish()) {
                if (roomArray[socket.gbraverInfo.roomId].isGameEnd()) {
                    dissolveRoom(socket.gbraverInfo.roomId);
                } else {
                    var ret = roomArray[socket.gbraverInfo.roomId].executePhase();
                    io.sockets.in(socket.gbraverInfo.roomId).emit('resp', ret);
                }
            }
        }

        function commandForSinglePlay(method,param){
            var enemyCommand = socket.gbraverInfo.enemyRoutineBase.getCommand();
            socket.gbraverInfo.singlePlayRoom.setCommand(NONE_PLAYER_CHARACTOR_NAME,enemyCommand.method,enemyCommand.param);
            socket.gbraverInfo.singlePlayRoom.setCommand(socket.gbraverInfo.userId,method,param);
            if(socket.gbraverInfo.singlePlayRoom.isInputFinish()){
                if(!socket.gbraverInfo.singlePlayRoom.isGameEnd()){
                    var ret = socket.gbraverInfo.singlePlayRoom.executePhase();
                    socket.gbraverInfo.enemyRoutineBase.setRespData(ret);
                    socket.emit('resp',ret);
                } else {
                    socket.gbraverInfo.singlePlayRoom = null;
                    socket.gbraverInfo.enemyRoutineBase = null;
                    socket.emit('dissolveRoom');
                }
            } else {
                console.log('enemy routine error.');
            }
        }

        function dissolveRoom(P_roomId){
            roomArray[P_roomId] = room();

            var clients = findClientsSocketByRoomId(P_roomId);
            for (var i in clients) {
                clients[i].leave(P_roomId);
                clients[i].gbraverInfo.roomId = null;
                clients[i].emit('dissolveRoom');
            }
        }

        //TODO : socket.io 1.0ではルームに接続しているコネクションリストがとれなくなった。
        //       一時的に参考サイトのやり方でしのぐ。
        //       http://stackoverflow.com/questions/23858604/how-to-get-rooms-clients-list-in-socket-io-1-0
        function findClientsSocketByRoomId(roomId) {
            var res = [];
            var room = io.sockets.adapter.rooms[roomId];
            if (room) {
                for (var id in room) {
                    res.push(io.sockets.adapter.nsp.connected[id]);
                }
            }
            return res;
        }

        socket.on('disconnect', function(data) {
            if(socket.gbraverInfo.roomId !== null){
                dissolveRoom(socket.gbraverInfo.roomId);
            }
        });

        socket.on('setArmdozer', function (data) {
            var armdozerId = data.armdozerId;
            dao.setArmdozerId(socket.gbraverInfo.userId, armdozerId, function (err, result) {
                if (result === true) {
                    socket.emit('successSetArmdozer', {});
                }
            });
        });

        socket.on('leaveRoom',function(){
            roomArray[socket.gbraverInfo.roomId] = room();
            socket.gbraverInfo.roomId = null;
            socket.emit('successLeaveRoom');
        });

        socket.on('getRoomInfo',function(){
            var roomInfo = {};
            for(var i = 0; i < 5; i++){
                roomInfo[i] = roomArray[i].getUserIdList();
            }
            socket.emit('successGetRoomInfo',roomInfo);
        });

        socket.on('setPilot',function(data){
            var userId = socket.gbraverInfo.userId;
            var pilotId = data.pilotId;
            dao.setPilotId(userId,pilotId,function(err,result){
                socket.emit('successSetPilot',true);
            });
        });

        socket.on('getMasterData',function(data){
            dao.getMasterData(function(err,data){
                socket.emit('successGetMasterData',data);
            });
        });
    });

    return io;
};

module.exports = server;
