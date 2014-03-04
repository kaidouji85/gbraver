var PICT_PREFIX = location.origin + '/images/';
var core;
enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    //core.preload();
    core.start();
    core.onload = function(){
        var BatteryMertor = batteryMertor();
        BatteryMertor.x = 10;
        BatteryMertor.x = 30;
        core.rootScene.addChild(BatteryMertor);
    };
};
