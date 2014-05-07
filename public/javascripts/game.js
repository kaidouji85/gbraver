function game(spec, my) {
    /**
     * ゲームコア
     */
    var core = new Core(320, 480);
    
    //TODO : 戦闘画面の画像パス定数もcore.XXXXXのようにパブリック関数化したい
    //       また、画像パス定数の値をPICT_PREFIX+XXXXのようにフルパスにしたい
    core.PICT_PREFIX = location.origin + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
    core.ICON_WIDTH = 124;      //TODO : battleSceneの中に入れたい
    core.ICON_HEIGHT = 40;      //TODO : battleSceneの中に入れたい
    core.COMMAND_POX_X = 8;     //TODO : battleSceneの中に入れたい
    core.COMMAND_POS_Y = 300;   //TODO : battleSceneの中に入れたい
        
    core.fps = 60;
    core.battleScene = new Scene();
    core.roomSelectScene;
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
     * 戦闘シーン
     */
    core.changeBattleScene = function(spec){
        spec.core = core;
        core.battleScene = new battleScene(spec);
        core.pushScene(core.battleScene);             
    };

    /**
     * ルームセレクト
     */
    core.changeRoomSelectScene = function(spec){
        spec.core = core;
        core.roomSelectScene = new roomSelectScene(spec);
        core.replaceScene(core.roomSelectScene);
        core.roomSelectScene.initSprite();//TODO : initSprite()をchangeRoom()の中で実行したい。
    };
    
    //TODO : roomSelectSceneの存在確認チェックを入れたい
    core.onEnterRoom = function(fn){
        core.roomSelectScene.onEnterRoom(fn);
    };
    
    return core;
}
