function game(spec, my) {
    /**
     * ゲームコア
     */
    var core = gameBase();
    var userId = spec.userId;
    var armdozerPict = spec.armdozerPict;
    var pilotPict = spec.pilotPict;
    var pilotList = spec.pilotList;
    var armdozerList = spec.armdozerList;
    var emitChangeScene = function(scene){};
    var emitSendMessage = function(message,data){};

    /**
     * 戦闘シーンに切り替える 
     * @param {Object} spec
     * {
     *     userId : String
     * }
     */
    core.changeBattleScene = function(spec){
        spec.userId = userId;
        core.battleScene = battleScene(spec);
        core.battleScene.onCommand(function(command){
            emitSendMessage('command',command);
        });
        core.pushScene(core.battleScene);
        emitChangeScene('battle');
    };

    core.changeRoomSelectScene = function(roomInfo){
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
        core.replaceScene(core.roomSelectScene);
        emitChangeScene('selectRoom');
    };
    
    core.changeTopScene = function(){
        core.topScene = topScene({
            armdozerPict : armdozerPict,
            pilotPict : pilotPict
        });
        core.topScene.onPushSelectArmdozerButton(function(){
            core.changeSelectArmdozerScene();
        });
        core.topScene.onPushBattleRoom(function(){
            emitSendMessage('getRoomInfo',null);
        });
        core.topScene.onPushSinglePlay(function(){
            emitSendMessage('startSinglePlay',{
                enemyId:'landozer',
                routineId : 'attack3'
            });
        });
        core.topScene.onPushSelectPilotButton(function(){
            core.changeSelectPilotScene();
        });
        core.replaceScene(core.topScene);
        emitChangeScene('top');
    };
    
    core.changeSetArmdozerScene = function(data){
        core.setArmdozerScene = setArmdozerScene(data);
        core.setArmdozerScene.onSelectArmdozer(function(data){
            emitSendMessage('getCharacterInfo',data);
        });
        core.setArmdozerScene.onPushPrevButton(function(data){
            core.changeTopScene();
        });
        core.replaceScene(core.setArmdozerScene);
        emitChangeScene('setArmdozer');
    };

    core.changeArmdozerInfoScene = function(respData){
        var scene = armdozerInfoScene({
            armdozerInfo : respData
        });
        scene.onPushOkButton(function(sendData){
            armdozerPict = respData.pictName;
            emitSendMessage('setArmdozer',sendData);
        });
        scene.onPushPrevButton(function(){
            emitSendMessage('getCharacterList');
        })
        core.replaceScene(scene);
        emitChangeScene('armdozerInfo');

    }

    core.changeSelectPilotScene = function() {
        var scene = selectPilotScene({
            pilotList : pilotList,
            pilotPict : pilotPict
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });
        scene.onPushOkButton(function(l_pilotId,l_pilotPict){
            var data = {
                pilotId : l_pilotId
            };
            emitSendMessage('setPilot',data);
            pilotPict = l_pilotPict;
        });
        core.replaceScene(scene);
        emitChangeScene('selectPilot');
    }

    core.changeSelectArmdozerScene = function(){
        var scene = selectArmdozerScene({
            armdozerList : armdozerList,
            selectArmdozerId : getArmdozerIdByPictName(armdozerPict)
        });
        scene.onPushOkButton(function(armdozerId){
            var sendData = {
                armdozerId : armdozerId
            };
            armdozerPict = getArmdozerPictByArmdozerId(armdozerId);
            emitSendMessage('setArmdozer',sendData);
        });
        scene.onPushPrevButton(function(){
            core.changeTopScene();
        });
        core.replaceScene(scene);
        emitChangeScene('selectArmdozer');
    }

    core.onChangeScene = function(fn){
        emitChangeScene = fn;
    };
    
    core.onSendMessage = function(fn){
        emitSendMessage = fn;
    };
    
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
                core.battleScene = null;
                core.changeTopScene();
                break;
            case 'successGetCharacterList' :
                core.changeSetArmdozerScene({
                    armdozerIdList : data
                });
                break;
            case 'successGetCharacterInfo':
                core.changeArmdozerInfoScene(data);
                break;
            case 'succesEnterRoom':
                core.roomSelectScene.emitSuccesEnterRoom();
                break;
            case 'successLeaveRoom':
                core.changeTopScene();
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
        }
    };

    core.getArmdozerPict = function() {
        return armdozerPict;
    }

    core.getPilotPict = function(){
        return pilotPict;
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

    function getArmdozerIdByPictName(pictName){
        for(var i in armdozerList){
            if(armdozerList[i].pictName === pictName) {
                return armdozerList[i].armdozerId;
            }
        }
    }

    function getArmdozerPictByArmdozerId(armdozerId){
        for(var i in armdozerList){
            if(armdozerList[i].armdozerId === armdozerId) {
                return armdozerList[i].pictName;
            }
        }
    }

    return core;
}
