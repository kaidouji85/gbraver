enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;

window.onload = function() {
    var socket = io.connect(location.origin);
    var userId = $("meta[name=userId]").attr('content');
    var armdozerPict;
    var armdozerList;
    var pilotPict;
    var pilotList;
    var Game;

    //ユーザ認証する
    socket.emit('auth', {
        userId : userId
    });
    console.log(getTime()+' emit auth');//test

    //ユーザ認証成功
    socket.on('successAuth', function(data) {
        console.log(getTime()+' successAuth');//test
        armdozerPict = data.armdozerPict;
        pilotPict = data.pilotPict;
        getArmdozerList();
    });

    function getArmdozerList(){
        console.log(getTime()+' getArmdozerList');//test
        socket.emit('getArmdozerList');
        socket.once('successGetArmdozerList',successGetArmdozerList);
    }

    function successGetArmdozerList(data){
        console.log(getTime()+' successGetArmdozerList');//test
        armdozerList = data;
        getPilotList();
    }

    function getPilotList(){
        console.log(getTime()+' getPilotList');//test
        socket.emit('getPilotList');
        socket.once('successGetPilotList',successGetPilotList);
    }

    function successGetPilotList(data) {
        console.log(getTime()+' successGetPilotList');//test
        pilotList = data;
        initGame();
    }

    function initGame(){
        console.log(getTime()+' initGame');//test
        Game = new game({
            userId : userId,
            armdozerPict : armdozerPict,
            armdozerList : armdozerList,
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

            socket.on('successSetPilot',function(data){
                Game.emitServerResp('successSetPilot',data);
            });

            socket.on('reconnecting',function(){
                console.log('reconnecting');
                window.location = location.origin;
            });

        };
    }

    function getTime(){
        var time = new Date();
        return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+':'+time.getMilliseconds();
    }
};