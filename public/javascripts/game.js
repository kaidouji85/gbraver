function game(spec, my) {
    var PICT_PREFIX = location.origin + '/images/';
    
    var core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var spriteArray = {};

    preLoad();
    core.onload = function() {
        initSprite();
        core.rootScene.addEventListener('enterframe', function(e) {
        });
    };

    function preLoad() {
        for (var uid in statusArray) {
            var path = PICT_PREFIX + statusArray[uid].pictName;
            core.preload(path);
        }
    }

    function initSprite() {
        for (var uid in statusArray) {
            spriteArray[uid] = new Sprite(128, 128);
            spriteArray[uid].image = core.assets[PICT_PREFIX+statusArray[uid].pictName];
            spriteArray[uid].y = 80;
            if(uid === userId){
                spriteArray[uid].x = 192;
            } else {
                spriteArray[uid].x = 0;
                spriteArray[uid].scaleX = -1;
            }
            core.rootScene.addChild(spriteArray[uid]);
        }
    }

    return core;
}
