function game(spec, my) {
    /**
     * ゲームコア
     */
    var core = new Core(320, 480);
    
    core.PICT_PREFIX = location.origin + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
        
    core.fps = 60;
    core.battleScene;
    core.roomSelectScene;
    core.setArmdozerScene;
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

    core.changeBattleScene = function(spec){
        core.battleScene = battleScene(spec);
        core.pushScene(core.battleScene);             
    };

    core.changeRoomSelectScene = function(spec){
        core.roomSelectScene = roomSelectScene(spec);
        core.replaceScene(core.roomSelectScene);
    };
    
    core.changeArmdozerConfigScene = function(){
        core.setArmdozerScene = setArmdozerScene();
        core.replaceScene(core.setArmdozerScene);
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
    };
    
    core.changeSetArmdozerScene = function(){
        core.setArmdozerScene = setArmdozerScene();
        core.replaceScene(core.setArmdozerScene);
    };

    return core;
}
