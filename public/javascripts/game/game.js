function game(spec, my) {
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
    var battleMode = core.BATTLE_MODE_TWO_PLAY;
    var emitChangeScene = function(scene){};
    var emitSendMessage = function(message,data){};
    var emitLogOff = function(){};

    core.changeTitleScene = function(){
        var scene = new titleScene();
        scene.onPushStartButton(function(){
            core.changeTopScene();
        });
        core.replaceScene(scene);
    }

    core.changeBattleScene = function(spec){
        spec.userId = userId;
        core.battleScene = battleScene(spec);
        core.battleScene.onCommand(function(command){
            emitSendMessage('command',command);
        });
        core.battleScene.onPushBattleEndIcon(function(){
            if(battleMode===core.BATTLE_MODE_TWO_PLAY){
                emitSendMessage('getRoomInfo',null);
            } else if(battleMode===core.BATTLE_MODE_SINGLE_PLAY) {
                core.changeSelectStageScene();
            }
        });
        core.pushScene(core.battleScene);
        emitChangeScene('battle');
    };

    core.changeRoomSelectScene = function(roomInfo){
        battleMode = core.BATTLE_MODE_TWO_PLAY;
        core.roomSelectScene = roomSelectScene({
            roomInfo : roomInfo
        });
        core.roomSelectScene.onEnterRoom(function(data){
            emitSendMessage('enterRoom',data);
        });
        core.roomSelectScene.onPushPrevButton(function(data){
            core.changeTopScene();
        });
        core.roomSelectScene.onLeaveRoom(function(){
            emitSendMessage('leaveRoom',null);
        });
        core.roomSelectScene.onPushRefreshButton(function(){
            emitSendMessage('getRoomInfo',null);
        });
        core.replaceScene(core.roomSelectScene);
        emitChangeScene('selectRoom');
    };
    
    core.changeTopScene = function(){
        core.topScene = topScene({
            armdozerId : armdozerId,
            pilotId : pilotId,
            armdozerList : armdozerList,
            pilotList : pilotList
        });
        core.topScene.onPushSelectArmdozerButton(function(){
            core.changeSelectArmdozerScene();
        });
        core.topScene.onPushBattleRoom(function(){
            emitSendMessage('getRoomInfo',null);
        });
        core.topScene.onPushSelectPilotButton(function(){
            core.changeSelectPilotScene();
        });
        core.topScene.onPushSelectStageButton(function(){
            core.changeSelectStageScene();
        });
        core.topScene.onPushLogOffButton(function(){
            emitLogOff();
        });
        core.replaceScene(core.topScene);
        emitChangeScene('top');
    };

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
        core.replaceScene(scene);
        emitChangeScene('selectPilot');
    }

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
        });
        core.replaceScene(scene);
        emitChangeScene('selectArmdozer');
    }

    core.changeSelectStageScene = function(){
        var scene = selectStageScene({
            stageData : stageData,
            armdozerList : armdozerList
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });
        scene.onPushStageButon(function(enemyId,routineId){
            var data = {
                enemyId : enemyId,
                routineId : routineId
            };
            emitSendMessage('startSinglePlay',data);
        });
        core.replaceScene(scene);
        battleMode = core.BATTLE_MODE_SINGLE_PLAY;
        emitChangeScene('selectStage');
    }

    core.onChangeScene = function(fn){
        emitChangeScene = fn;
    };
    
    core.onSendMessage = function(fn){
        emitSendMessage = fn;
    };

    core.onLogOff = function(fn){
        emitLogOff = fn;
    }
    
    core.emitServerResp = function(message,data){
        switch(message) {
            case 'successSetArmdozer' :
                core.changeTopScene();
                break;
            case 'gameStart' :
                var statusArray = {};
                for (var uid in data) {
                    statusArray[uid] = data[uid].status;
                }
                core.changeBattleScene({
                    statusArray : statusArray
                });
                emitSendMessage('command',{
                    method : 'ready'
                });
                break;
            case 'resp' :
                changePhase(data);
                break;
            case 'dissolveRoom':
                core.battleScene.doDissolveRoom();
                break;
            case 'succesEnterRoom':
                core.roomSelectScene.emitSuccesEnterRoom();
                break;
            case 'successLeaveRoom':
                emitSendMessage('getRoomInfo',null);
                break;
            case 'successGetRoomInfo':
                core.changeRoomSelectScene(data);
                break;
            case 'enterRoomError':
                core.roomSelectScene.emitEnterRoomError(data);
                break;
            case 'successSetPilot':
                core.changeTopScene();
                break;
            case 'battleError' :
                core.changeTopScene();
                break;
        }
    };

    core.getArmdozerId = function() {
        return armdozerId;
    }

    core.getPilotId = function(){
        return pilotId;
    }

    core.getBattleMode = function(){
        return battleMode;
    }

    core.setBattleMode = function(mode){
        battleMode = mode;
    }

    function changePhase(data){
        var phase = data.phase;
        switch(phase) {
            case 'wait':
                core.battleScene.doWaitPhase(data);
                break;
            case 'atackCommand':
                core.battleScene.doAtackCommandPhase(data);
                break;
            case 'charge':
                core.battleScene.doChargePhase(data);
                break;
            case 'defenthCommand':
                core.battleScene.doDefenthCommandPhase(data);
                break;
            case 'damage':
                core.battleScene.doDamagePhase(data);
                break;
            case 'gameEnd':
                core.battleScene.doGameEnd(data);
                break;
            case 'pilotSkill':
                core.battleScene.doPilotSkill(data);
                break;
        }
    }

    return core;
}