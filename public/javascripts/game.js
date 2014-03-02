function game(spec, my) {
    var PICT_PREFIX = location.origin + '/images/';
    var PICT_ACTIVE_BAR = 'activeBar.png';
    
    var core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var charaSpriteArray = {};
    var activeBarArray = {};
    
    preLoad();
    core.onload = function() {
        initSprite();
        emitReady();
        core.rootScene.addEventListener('enterframe', function(e) {
        });
    };
    
    var emitReady;   
    core.onReady = function(fn){
        emitReady = fn;
    };

    function preLoad() {
        for (var uid in statusArray) {
            core.preload(PICT_PREFIX + statusArray[uid].pictName);
        }
        core.preload(PICT_PREFIX+PICT_ACTIVE_BAR);
    }

    function initSprite() {
        for(var uid in statusArray){
            //キャラクタースプライト
            charaSpriteArray[uid] = new Sprite(128, 128);
            charaSpriteArray[uid].image = core.assets[PICT_PREFIX+statusArray[uid].pictName];
            charaSpriteArray[uid].y = 80;
            if(uid === userId){
                charaSpriteArray[uid].x = 192;
            } else {
                charaSpriteArray[uid].x = 0;
                charaSpriteArray[uid].scaleX = -1;
            }
            core.rootScene.addChild(charaSpriteArray[uid]);
            
            //アクティブゲージ
            activeBarArray[uid] = new Bar(0,0);
            activeBarArray[uid].y = 40;
            activeBarArray[uid].image =  core.assets[PICT_PREFIX+PICT_ACTIVE_BAR];
            activeBarArray[uid].maxValue = 120;
            activeBarArray[uid].value = 0;
            if(uid === userId){
                activeBarArray[uid].x = 190;
                activeBarArray[uid].direction = 'right';
            } else {
                activeBarArray[uid].x = 130;
                activeBarArray[uid].direction = 'left';
                activeBarArray[uid].scaleX = -1;
            }
            core.rootScene.addChild(activeBarArray[uid]);
        }
    }
    
    core.doWaitPhase = function(data){
        var atackUserId = data.atackUserId;
        var newStatusArray = data.statusArray;
        for(var uid in newStatusArray) {
            var value = newStatusArray[uid].active / 5000 * activeBarArray[uid].maxValue;
            activeBarArray[uid].value = value;
        }
    };

    return core;
}
