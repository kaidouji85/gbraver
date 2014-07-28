var PICT_PREFIX = location.origin + '/images/';
var PICT_ACTIVE_BAR = 'activeBar.png';
var PICT_ACTIVE_BAR_BACK = 'activeBack.png';
var core;

enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_PREFIX + PICT_ACTIVE_BAR);
    core.preload(PICT_PREFIX + PICT_ACTIVE_BAR_BACK);
    core.start();

    core.onload = function() {
        var test = customBar({
            barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
            backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
            maxValue : 120,
            direction : 'right'
        });
        test.x = 50;
        test.y = 50;
        test.plus(60, 120 / 60);
        core.rootScene.addChild(test);

        var test2 = customBar({
            barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
            backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
            maxValue : 120,
            direction : 'left'
        });
        test2.x = 170;
        test2.y = 80;
        test2.plus(60, 120 / 60);
        core.rootScene.addChild(test2);
        
        var test3 = customBar({
            barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
            backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
            maxValue : 120,
            direction : 'left'
        });
        test3.setValue(120);
        test3.x = 170;
        test3.y = 150;
        core.rootScene.addChild(test3);


        var test4 = customBar({
            barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
            backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
            maxValue : 120,
            direction : 'left'
        });
        test4.setValue(-120);
        test4.x = 170;
        test4.y = 200;
        core.rootScene.addChild(test4);
        
        core.rootScene.addEventListener('enterframe', function(e) {
        });
    };
};
