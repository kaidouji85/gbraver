'use strict';
import game from './game/game';
import __ from 'underscore';
import Promise from 'bluebird';
//TODO マスタデータにトーナメントを追加したら消す
import DummyTournament from '../test/game/src/testlib/dummyTournamentData';

const socket = io.connect(location.origin);

enchant();

/**
 * ユーザ認証を実行する
 * @returns {Promise} ユーザ情報
 */
function doAuth(userId) {
    return new Promise((resolve, reject)=>{
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
    return new Promise((resolve, reject)=>{
        socket.emit('getMasterData');
        socket.once('successGetMasterData',resolve);
    });
}

/**
 * enchant.jsのgame.omloadのイベントハンドラ
 * @param Game Gameオブジェクト
 */
function onLoad(Game) {
    let executeLogOff = ()=>window.location = location.origin+'/logOff';
    let executeReload = ()=> window.location = location.origin;

    // Clientからサーバへ通信するイベントを登録する
    Game.changeTopScene();
    Game.ee.on('sendMessage', (message,data)=>{
        socket.emit(message,data);
    });
    Game.ee.on('logOff', executeLogOff);

    // サーバからClientへ通信するイベントを登録する(戦闘系のみ)
    let serverRespForBattleList = [
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
    ];
    __.each(serverRespForBattleList,
        (message)=>socket.on(message, (data)=>Game.ee.emit('serverResp', message, data)));

    // サーバからClientへ通信するイベントを登録する(戦闘系以外)
    socket.on('logOff', executeLogOff);
    socket.on('reconnecting', executeReload);
    socket.on('noLoginError', executeReload);
}

/**
 *  Gブレイバーのメイン関数
 */
window.onload = function() {
    let userId = $("meta[name=userId]").attr('content');
    let contentBaseUrl = $("meta[name=contentBaseUrl]").attr('content');
    let userData;
    doAuth(userId).then(function(data){
        userData = data;
        return getMasterData();
    }).then((masterData)=>{
        let Game = new game({
            userId : userId,
            contentBaseUrl : contentBaseUrl,
            armdozerId : userData.armdozerId,
            pilotId : userData.pilotId,
            armdozerList : masterData.armdozerList,
            pilotList : masterData.pilotList,
            tournamentList: DummyTournament
        });
        Game.start();
        Game.onload = ()=> onLoad(Game);
    });
};