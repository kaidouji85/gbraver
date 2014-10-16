enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;

window.onload = function() {
    var socket = io.connect(location.origin);
    var userId = $("meta[name=userId]").attr('content');
    var armdozerPict;
    var pilotPict;
    var pilotList;
    var Game;

    //ユーザ認証する
    socket.emit('auth', {
        userId : userId
    });

    //ユーザ認証成功
    socket.on('successAuth', function(data) {
        armdozerPict = data.armdozerPict;
        pilotPict = data.pilotPict;
        getPilotList();
    });

    function getPilotList(){
        socket.emit('getPilotList');
        socket.once('successGetPilotList',successGetPilotList);
    }

    function successGetPilotList(data) {
        pilotList = data;
        initGame();
    }

    function initGame(){
        Game = new game({
            userId : userId,
            armdozerPict : armdozerPict,
            pilotPict : pilotPict,
            pilotList : pilotList
        });
        Game.start();
        Game.onload = function() {
            Game.changeTopScene();
            Game.onSendMessage(function(message,data){
                socket.emit(message,data);
            });

            socket.on('succesEnterRoom', function() {
                Game.emitServerResp('succesEnterRoom');
            });

            socket.on('successSetArmdozer', function(data) {
                Game.emitServerResp('successSetArmdozer',data);
            });

            socket.on("gameStart", function(data){
                Game.emitServerResp('gameStart',data);
            });

            socket.on('resp', function(data){
                Game.emitServerResp('resp',data);
            });

            socket.on('dissolveRoom', function(data){
                Game.emitServerResp('dissolveRoom',data);
            });

            socket.on('successGetCharacterList',function(data){
                Game.emitServerResp('successGetCharacterList',data);
            });

            socket.on('successGetCharacterInfo',function(data){
                Game.emitServerResp('successGetCharacterInfo',data);
            });

            socket.on('successLeaveRoom',function(){
                Game.emitServerResp('successLeaveRoom',null);
            });

            socket.on('successGetRoomInfo',function(data){
                Game.emitServerResp('successGetRoomInfo',data);
            });

            socket.on('enterRoomError',function(data){
                Game.emitServerResp('enterRoomError',data);
            });
        };
    }
};