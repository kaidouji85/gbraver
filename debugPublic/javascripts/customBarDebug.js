var PICT_PREFIX = location.origin + '/images/';
var PICT_ACTIVE_BAR = 'activeBar.png';
var PICT_ACTIVE_BASE = 'activeBase.png';
var core;

enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_PREFIX + PICT_ACTIVE_BAR);
    core.preload(PICT_PREFIX + PICT_ACTIVE_BASE);
    core.start();

    core.onload = function() {
         var test = customBar();
        test.image = core.assets[PICT_PREFIX + PICT_ACTIVE_BAR];
        test.maxValue = 120;
        test.value = 0;
        test.direction = 'right';
        core.rootScene.addChild(test);
        
        test.plus(60,1);
       
        core.rootScene.addEventListener('enterframe', function(e) {
        });

    };
};
