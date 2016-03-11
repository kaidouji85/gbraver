var game = require('./game/game');

enchant();
window.onload = function() {
    var socket = io.connect(location.origin);
    var userId = $("meta[name=userId]").attr('content');
    var contentBaseUrl = $("meta[name=contentBaseUrl]").attr('content');//TODO : テストコードがない
    var masterData;
    var userData;
    var stageData;
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
            contentBaseUrl : contentBaseUrl,
            armdozerId : userData.armdozerId,
            pilotId : userData.pilotId,
            armdozerList : masterData.armdozerList,
            pilotList : masterData.pilotList,
            stageData : masterData.stageData,
            scenarioData : masterData.scenarioData
        });
        //console.log(getTime()+' load start');//test
        Game.start();
        Game.onload = function() {
            //console.log(getTime()+' load complate');//test
            Game.changeTopScene();
            Game.ee.on('sendMessage', function(message,data){
                socket.emit(message,data);
            });
            //TODO : テストコードがない
            Game.ee.on('logOff', function(){
                window.location = location.origin+'/logOff';
            });

            socket.on('succesEnterRoom', function() {
                Game.ee.emit('serverResp', 'succesEnterRoom');
            });

            socket.on('successSetArmdozer', function(data) {
                Game.ee.emit('serverResp', 'successSetArmdozer',data);
            });

            socket.on("gameStart", function(data){
                Game.ee.emit('serverResp', 'gameStart',data);
            });

            socket.on('resp', function(data){
                Game.ee.emit('serverResp', 'resp',data);
            });

            socket.on('dissolveRoom', function(data){
                Game.ee.emit('serverResp', 'dissolveRoom',data);
            });

            socket.on('successLeaveRoom',function(){
                Game.ee.emit('serverResp', 'successLeaveRoom',null);
            });

            socket.on('successGetRoomInfo',function(data){
                Game.ee.emit('serverResp', 'successGetRoomInfo',data);
            });

            socket.on('enterRoomError',function(data){
                Game.ee.emit('serverResp', 'enterRoomError',data);
            });

            socket.on('successSetPilot',function(data){
                Game.ee.emit('serverResp', 'successSetPilot',data);
            });

            //TODO : 自動テストがない
            socket.on('reconnecting',function(){
                console.log('reconnecting');
                window.location = location.origin;
            });

            //TODO : 自動テストがない
            socket.on('noLoginError',function(data){
                console.log('no login error.');
                console.log(data);
                window.location = location.origin;
            });

            socket.on('battleError',function(data){
                Game.ee.emit('serverResp', 'battleError',data);
            });
        };
    }

    function getTime(){
        var time = new Date();
        return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+':'+time.getMilliseconds();
    }
};