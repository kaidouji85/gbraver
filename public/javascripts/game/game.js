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
        var scene = battleScene(spec);
        scene.onCommand(function(command){
            emitSendMessage('command',command);
        });
        scene.onPushBattleEndIcon(function(){
            if(battleMode===core.BATTLE_MODE_TWO_PLAY){
                emitSendMessage('getRoomInfo',null);
            } else if(battleMode===core.BATTLE_MODE_SINGLE_PLAY) {
                core.changeSelectStageScene();
            }
        });
        core.pushScene(scene);
        emitChangeScene(core.currentScene.getName());
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
        emitChangeScene(core.currentScene.getName());
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
        emitChangeScene(core.currentScene.getName());
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
        emitChangeScene(core.currentScene.getName());
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
        emitChangeScene(core.currentScene.getName());
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
        emitChangeScene(core.currentScene.getName());
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
                if(core.currentScene.getName()==='battle'){
                    core.currentScene.doDissolveRoom();
                }
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
            case 'battleError' :    //TODO : 自動テストがない
                if(core.currentScene.getName()==='battle'){
                    core.changeTopScene();
                } else if(core.currentScene.getName()==='selectRoom') {
                    core.currentScene.emitEnterRoomError('そのコネクションは既に入室しています。');
                }
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
                core.currentScene.doWaitPhase(data);
                break;
            case 'atackCommand':
                core.currentScene.doAtackCommandPhase(data);
                break;
            case 'charge':
                core.currentScene.doChargePhase(data);
                break;
            case 'defenthCommand':
                core.currentScene.doDefenthCommandPhase(data);
                break;
            case 'damage':
                core.currentScene.doDamagePhase(data);
                break;
            case 'gameEnd':
                core.currentScene.doGameEnd(data);
                break;
            case 'pilotSkill':
                core.currentScene.doPilotSkill(data);
                break;
            case 'armdozerAbility':
                core.currentScene.doArmdozerAbility(data);
                break;
        }
    }

    return core;
}
