function game(spec, my) {
    /**
     * ゲームコア
     */
    var core = new Core(320, 480);
    var userId = spec.userId;
    var emitChangeScene = function(scene){};
    var emitSendMessage = function(message,data){};
    
    core.PICT_PREFIX = location.origin + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
        
    core.fps = 60;
    core.battleScene = null;
    core.roomSelectScene = null;
    core.setArmdozerScene = null;
    preLoad();
    
    function preLoad() {
        //戦闘画面
        core.preload(core.PICT_PREFIX+'GranBraver.PNG');
        core.preload(core.PICT_PREFIX+'Landozer.PNG');
        core.preload(core.PICT_ACTIVE_BAR);
        core.preload(core.PICT_ACTIVE_BAR_BACK);
        core.preload(core.PICT_BATTERY_GAUGE);
        core.preload(core.PICT_BATTERY_BACK);
        core.preload(core.PICT_BATTERY_NUMBER); 
    }

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

    core.changeRoomSelectScene = function(){
        core.roomSelectScene = roomSelectScene();
        core.roomSelectScene.onEnterRoom(function(data){
            emitSendMessage('enterRoom',data);
        });
        core.roomSelectScene.onPushPrevButton(function(data){
            core.changeTopScene();
        });  
        core.replaceScene(core.roomSelectScene);
        emitChangeScene('selectRoom');
    };
    
    core.changeTopScene = function(){
        core.topScene = topScene();
        core.topScene.onPushSetArmdozer(function(){
            core.changeSetArmdozerScene();
        });
        core.topScene.onPushBattleRoom(function(){
            core.changeRoomSelectScene();
        });
        core.replaceScene(core.topScene);
        emitChangeScene('top');
    };
    
    core.changeSetArmdozerScene = function(){
        core.setArmdozerScene = setArmdozerScene();
        core.setArmdozerScene.onSelectArmdozer(function(data){
            emitSendMessage('setArmdozer',data);
        });
        core.setArmdozerScene.onPushPrevButton(function(data){
            core.changeTopScene();
        });        
        core.replaceScene(core.setArmdozerScene);
        emitChangeScene('setArmdozer');
    };
    
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
        }
    };
    
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
        }
    }

    return core;
}
