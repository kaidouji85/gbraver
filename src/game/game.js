var __ = require('underscore');
var gameBase = require('./gameBase');
var battleScene = require('../scene/battleScene');
var roomSelectScene = require('../scene/roomSelectScene');
var topScene = require('../scene/topScene');
var selectPilotScene = require('../scene/selectPilotScene');
var selectArmdozerScene = require('../scene/selectArmdozerScene');
var selectStageScene = require('../scene/selectStageScene');
var storyScene = require('../scene/storyScene');

module.exports = function(spec, my) {
    /**
     * ゲームコア
     */
    var contentBaseUrl = spec&&spec.contentBaseUrl || location.origin;
    var core = gameBase({
        contentBaseUrl : contentBaseUrl
    });
    var userId = spec.userId;
    var armdozerId = spec.armdozerId;
    var pilotId = spec.pilotId;
    var pilotList = spec.pilotList;
    var armdozerList = spec.armdozerList;
    var stageData = spec.stageData;
    var scenarioData = spec.scenarioData;
    var currentScenarioId = 'first';
    var nextScenarioId = null;
    var battleMode = core.BATTLE_MODE_TWO_PLAY;
    var emitChangeScene = function(scene){};
    var emitSendMessage = function(message,data){};
    var emitLogOff = function(){};

    /**
     * シーン変更のヘルパー関数
     * @param scene 変更するシーン
     */
    function replaceScene(scene) {
        core.replaceScene(scene);
        emitChangeScene(scene.getName());
    }

    /**
     * シーン変更が起きた際のイベントハンドラ
     * @param fn コールバック関数
     */
    core.onChangeScene = function(fn){
        emitChangeScene = fn;
    };

    /**
     * サーバへのメッセージ送信が起きた際のイベントハンドラ
     * @param fn コールバック関数
     */
    core.onSendMessage = function(fn){
        emitSendMessage = fn;
    };

    /**
     * ログオフした際のイベントハンドラ
     * @param fn
     */
    core.onLogOff = function(fn){
        emitLogOff = fn;
    }

    /**
     * アームドーザIDを取得する
     * @returns {string} アームドーザID
     */
    core.getArmdozerId = function() {
        return armdozerId;
    }

    /**
     * パイロットIDを取得する
     * @returns {string} パイロットID
     */
    core.getPilotId = function(){
        return pilotId;
    }

    /**
     * 戦闘モードを取得する
     * @returns {string} 戦闘モード
     */
    core.getBattleMode = function(){
        return battleMode;
    }

    /**
     * 戦闘モードを設定する
     * @param mode 戦闘モード
     */
    core.setBattleMode = function(mode){
        battleMode = mode;
    }

    /**
     * シナリオIDを取得する
     * @returns {string} シナリオID
     */
    core.getScenarioId = function(){
        return currentScenarioId;
    }

    /**
     * シナリオIDを設定する
     * @param id シナリオID
     */
    core.setScenarioId = function(id){
        currentScenarioId = id;
    }

    /**
     * 次のシナリオIDを取得する
     * @returns {string} 次のシナリオID
     */
    core.getNextScenarioId = function(){
        return nextScenarioId;
    }

    /**
     * 次のシナリオIDを設定する
     * @param id シナリオID
     */
    core.setNextScenarioId = function(id){
        nextScenarioId = id;
    }

    /**
     * 戦闘シーンに変更する
     *
     * @param spec battleSceneに渡すspec
     */
    core.changeBattleScene = function(spec){
        spec.userId = userId;
        var scene = battleScene(spec);
        scene.onCommand(function(command){
            emitSendMessage('command',command);
        });
        scene.onPushBattleEndIcon(function(isWin){
            if(battleMode===core.BATTLE_MODE_TWO_PLAY){
                emitSendMessage('getRoomInfo',null);
            } else if(battleMode===core.BATTLE_MODE_SINGLE_PLAY) {
                core.changeSelectStageScene();
            } else if(battleMode===core.BATTLE_MODE_STORY){
                currentScenarioId = isWin ? nextScenarioId : currentScenarioId;
                nextScenarioId = null;
                core.changeStoryScene(currentScenarioId);
            }
        });
        replaceScene(scene);
    };

    /**
     * ルームセレクトシーンに変更する
     *
     * @param roomInfo ルーム情報
     */
    core.changeRoomSelectScene = function(roomInfo){
        battleMode = core.BATTLE_MODE_TWO_PLAY;
        var scene = roomSelectScene({
            roomInfo : roomInfo
        });
        scene.onEnterRoom(function(data){
            emitSendMessage('enterRoom',data);
        });
        scene.onPushPrevButton(function(data){
            core.changeTopScene();
        });
        scene.onLeaveRoom(function(){
            emitSendMessage('leaveRoom',null);
        });
        scene.onPushRefreshButton(function(){
            emitSendMessage('getRoomInfo',null);
        });
        replaceScene(scene);
    };

    /**
     * トップシーンに変更する
     *
     */
    core.changeTopScene = function(){
        var scene = topScene({
            armdozerId : armdozerId,
            pilotId : pilotId,
            armdozerList : armdozerList,
            pilotList : pilotList
        });
        scene.onPushSelectArmdozerButton(function(){
            core.changeSelectArmdozerScene();
        });
        scene.onPushBattleRoom(function(){
            emitSendMessage('getRoomInfo',null);
        });
        scene.onPushSelectPilotButton(function(){
            core.changeSelectPilotScene();
        });
        scene.onPushSelectStageButton(function(){
            core.changeSelectStageScene();
        });
        scene.onPushLogOffButton(function(){
            emitLogOff();
        });
        scene.onPushStoryButton(function(){
            core.changeStoryScene(currentScenarioId);
        });
        replaceScene(scene);
    };

    /**
     * パイロット選択シーンに変更する
     *
     */
    core.changeSelectPilotScene = function() {
        var scene = selectPilotScene({
            pilotList : pilotList,
            selectPilotId : pilotId
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });
        scene.onPushOkButton(function(l_pilotId){
            var data = {
                pilotId : l_pilotId
            };
            emitSendMessage('setPilot',data);
            pilotId = l_pilotId;
        });
        replaceScene(scene);
    }

    /**
     * アームドーザ選択シーンに変更する
     *
     */
    core.changeSelectArmdozerScene = function(){
        var scene = selectArmdozerScene({
            armdozerList : armdozerList,
            selectArmdozerId : armdozerId
        });
        scene.onPushOkButton(function(l_armdozerId){
            var sendData = {
                armdozerId : l_armdozerId
            };
            emitSendMessage('setArmdozer',sendData);
            armdozerId = l_armdozerId;
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });replaceScene(scene);
    }

    /**
     * ステージ選択シーンに変更する
     *
     */
    core.changeSelectStageScene = function(){
        var scene = selectStageScene({
            stageData : stageData,
            armdozerList : armdozerList
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });
        scene.onPushStageButon(function(enemyId,pilotId,routineId){
            var data = {
                enemyId : enemyId,
                pilotId : pilotId,
                routineId : routineId
            };
            emitSendMessage('startSinglePlay',data);
        });
        battleMode = core.BATTLE_MODE_SINGLE_PLAY;
        replaceScene(scene);
    }

    /**
     * ストーリーシーンに変更する
     *
     * @param senarioId シナリオID
     */
    core.changeStoryScene = function(senarioId){
        var scene = storyScene({
            scenarioData :
                __.chain(scenarioData)
                    .filter(function(item){return item.id === senarioId;})
                    .map(function(item){return item.data})
                    .first()
                    .value(),
            pilotList : pilotList
        });
        scene.onEndStory(function(battle){
            emitSendMessage('startSinglePlay',battle);
        });
        scene.onChangeNextStory(function(p_nextScenarioId){
            nextScenarioId = p_nextScenarioId;
        });
        battleMode = core.BATTLE_MODE_STORY;
        replaceScene(scene);
    }

    /**
     * サーバからのレスポンス内容に応じてアクションを実行する
     * @param message メッセージ
     * @param data データ
     */
    core.emitServerResp = function(message, data){
        switch(message) {
            case 'successSetArmdozer' :
                core.changeTopScene();
                break;
            case 'gameStart' :
                core.changeBattleScene({
                    timeOver : core.COMMAND_TIME_OVER,
                    statusArray : __.mapObject(data,function(val, key){
                        return val.status;
                    })
                });
                emitSendMessage('command',{
                    method : 'ready'
                });
                break;
            case 'resp' :
                changePhase(data);
                break;
            case 'dissolveRoom':
                if(core.currentScene.getName()==='battle'){
                    core.currentScene.doDissolveRoom();
                }
                break;
            case 'succesEnterRoom':
                if(core.currentScene.getName()==='selectRoom'){
                    core.currentScene.emitSuccesEnterRoom();
                }
                break;
            case 'successLeaveRoom':
                emitSendMessage('getRoomInfo',null);
                break;
            case 'successGetRoomInfo':
                core.changeRoomSelectScene(data);
                break;
            case 'enterRoomError':
                if(core.currentScene.getName()==='selectRoom') {
                    core.currentScene.emitEnterRoomError(data);
                }
                break;
            case 'successSetPilot':
                core.changeTopScene();
                break;
            case 'battleError' :    //TODO : 自動テストがない
                if(core.currentScene.getName()==='battle'){
                    core.changeTopScene();
                } else if(core.currentScene.getName()==='selectRoom') {
                    core.currentScene.emitEnterRoomError('そのコネクションは既に入室しています。');
                }
                break;
        }
    };

    /**
     * 戦闘結果のレスポンスに応じてアクションを実行する
     * @param data サーバからのデータ
     */
    function changePhase(data){
        var methodMap = {
            wait: 'doWaitPhase',
            atackCommand: 'doAtackCommandPhase',
            charge: 'doChargePhase',
            defenthCommand: 'doDefenthCommandPhase',
            damage: 'doDamagePhase',
            gameEnd: 'doGameEnd',
            pilotSkill: 'doPilotSkill',
            armdozerAbility: 'doArmdozerAbility'
        };
        __.each(methodMap, function(val, key){
            key === data.phase && core.currentScene[val](data);
        });
    }

    return core;
}
