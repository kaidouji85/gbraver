var PICT_PREFIX = location.origin + '/images/';
var PICT_BATTERY_GAUGE = 'batteryGauge.png';
var PICT_BATTERY_BACK = 'batteryBack.png';
var core;
enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_PREFIX+PICT_BATTERY_GAUGE);
    core.preload(PICT_PREFIX+PICT_BATTERY_BACK);
    core.start();
    core.onload = function(){
        var BatteryMertorR = batteryMertor({
            gaugeImage : core.assets[PICT_PREFIX + PICT_BATTERY_GAUGE],
            backImage : core.assets[PICT_PREFIX + PICT_BATTERY_BACK],
            direction : 'right'
        });
        BatteryMertorR.x = 40;
        BatteryMertorR.y = 40;
        BatteryMertorR.setValue(4);
        core.rootScene.addChild(BatteryMertorR);
        
        var BatteryMertorL = batteryMertor({
            gaugeImage : core.assets[PICT_PREFIX + PICT_BATTERY_GAUGE],
            backImage : core.assets[PICT_PREFIX + PICT_BATTERY_BACK],
            direction : 'left'
        });
        BatteryMertorL.x = 40;
        BatteryMertorL.y = 80;
        BatteryMertorL.setValue(4);
        core.rootScene.addChild(BatteryMertorL);        
        
    };
};
