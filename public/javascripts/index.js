enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;

window.onload = function() {
    var socket = io.connect(location.origin);
    var userId = $("meta[name=userId]").attr('content');
    var masterData;
    var userData;
    //TODO : サーバからデータを取得するようにする
    var stageData = [
        {
            title : '初級',
            enemyId : 'landozer',
            routineId : 'attack3'
        },
        {
            title : '中級',
            enemyId : 'granBraver',
            routineId : 'attack3'
        },
        {
            title : '上級',
            enemyId : 'zeroBraver',
            routineId : 'attack3'
        }
    ];
    var Game;

    //ユーザ認証する
    socket.emit('auth', {
        userId : userId
    });
    //console.log(getTime()+' emit auth');//test

    //ユーザ認証成功
    socket.on('successAuth', function(data) {
        //console.log(getTime()+' successAuth');//test
        userData = data;
        getMasterData();
    });

    function getMasterData(){
        //console.log(getTime()+' getMasterData');//test
        socket.emit('getMasterData');
        socket.once('successGetMasterData',successGetMasterData);
    }

    function successGetMasterData(data){
        //console.log(getTime()+' successGetMasterData');//test
        masterData = data;
        initGame();
    }

    function initGame(){
        //console.log(getTime()+' initGame');//test
        Game = new game({
            userId : userId,
            armdozerId : userData.armdozerId,
            pilotId : userData.pilotId,
            armdozerList : masterData.armdozerList,
            pilotList : masterData.pilotList,
            stageData : stageData
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