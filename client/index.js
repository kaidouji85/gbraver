var game = require('./game/game');
var __ = require('underscore');
var Promise = require('bluebird');
var socket = io.connect(location.origin);

enchant();

/**
 * ユーザ認証を実行する
 * @returns {Promise} ユーザ情報
 */
function doAuth(userId) {
    return new Promise(function(resolve, reject){
        //ユーザ認証する
        socket.emit('auth', {
            userId : userId
        });

        //ユーザ認証成功
        socket.on('successAuth', resolve);
    });
}

/**
 * マスタデータを取得する
 * @returns {Promise} マスタデータ
 */
function getMasterData() {
    return new Promise(function(resolve, reject){
        socket.emit('getMasterData');
        socket.once('successGetMasterData',resolve);
    });
}

/**
 * enchant.jsのgame.omloadのイベントハンドラ
 * @param Game Gameオブジェクト
 */
function onLoad(Game) {
    Game.changeTopScene();
    Game.ee.on('sendMessage', function(message,data){
        socket.emit(message,data);
    });

    __.each([
        'succesEnterRoom',
        'successSetArmdozer',
        'gameStart',
        'resp',
        'dissolveRoom',
        'successLeaveRoom',
        'successGetRoomInfo',
        'enterRoomError',
        'successSetPilot',
        'battleError'
    ], function(item){
        socket.on(item, function(data){
            Game.ee.emit('serverResp', item, data);
        });
    });

    __.each({
        logOff: function() {
            window.location = location.origin+'/logOff';
        },
        reconnecting: function() {
            console.log('reconnecting');
            window.location = location.origin;
        },
        noLoginError: function() {
            console.log('no login error.');
            console.log(data);
            window.location = location.origin;
        }
    }, function(val, key){
        socket.on(key, val);
    });
}

/**
 *  Gブレイバーのメイン関数
 */
window.onload = function() {
    var userId = $("meta[name=userId]").attr('content');
    var contentBaseUrl = $("meta[name=contentBaseUrl]").attr('content');
    var userData;
    doAuth(userId).then(function(data){
        userData = data;
        return getMasterData();
    }).then(function(masterData){
        var Game = new game({
            userId : userId,
            contentBaseUrl : contentBaseUrl,
            armdozerId : userData.armdozerId,
            pilotId : userData.pilotId,
            armdozerList : masterData.armdozerList,
            pilotList : masterData.pilotList,
            stageData : masterData.stageData,
            scenarioData : masterData.scenarioData
        });
        Game.start();
        Game.onload = function(){
            onLoad(Game);
        };
    });
};