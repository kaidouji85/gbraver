function game(spec, my) {
    var PICT_PREFIX = location.origin + '/images/';
    var PICT_ACTIVE_BAR = 'activeBar.png';
    var PICT_ACTIVE_BASE = 'activeBase.png';
    
    var core = new Core(320, 320);
    var phase = '';
    var phaseFrame = 0;
    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var charaSpriteArray = {};
    var activeBarArray = {};
    var hpLabelArray = {};
    var activeBaseArray = {};
    var batteryMertorArray = {};
    
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    preLoad();
    core.onload = function() {
        initSprite();
        emitReady();    
        core.rootScene.addEventListener('enterframe', function(e) {
            var frame = core.frame - phaseFrame;
            switch(phase){
                case 'wait':
                    break;
            }
        });
    };
    
    function changePhase(phaseName){
        phase = phaseName;
        phaseFrame = core.frame;
    }
    
    var emitReady = function(){};   
    core.onReady = function(fn){
        emitReady = fn;
    };

    function preLoad() {
        for (var uid in statusArray) {
            core.preload(PICT_PREFIX + statusArray[uid].pictName);
        }
        core.preload(PICT_PREFIX+PICT_ACTIVE_BAR);
        core.preload(PICT_PREFIX+PICT_ACTIVE_BASE);
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
            
            //アクティブゲージ土台
            activeBaseArray[uid] = new Sprite(120,18);
            activeBaseArray[uid].image = core.assets[PICT_PREFIX+PICT_ACTIVE_BASE];
            activeBaseArray[uid].y = 29;
            if(uid === userId){
                activeBaseArray[uid].x = 190;
            } else {
                activeBaseArray[uid].x = 10;
            }
            core.rootScene.addChild(activeBaseArray[uid]);            
            
            //アクティブゲージ
            activeBarArray[uid] = activeBar();
            activeBarArray[uid].image =  core.assets[PICT_PREFIX+PICT_ACTIVE_BAR];
            activeBarArray[uid].y = 30;
            if(uid === userId){
                activeBarArray[uid].x = 190;
                activeBarArray[uid].direction = 'right';
            } else {
                activeBarArray[uid].x = 130;
                activeBarArray[uid].direction = 'left';
                activeBarArray[uid].scaleX = -1;
            }
            core.rootScene.addChild(activeBarArray[uid]);
            
            //HPラベル
            hpLabelArray[uid] = new MutableText(0,0);
            hpLabelArray[uid].y = 8;
            if(uid===userId){
                hpLabelArray[uid].x = 190;
            } else {
                hpLabelArray[uid].x = 20;
            }
            hpLabelArray[uid].text = 'HP '+statusArray[uid].hp;
            core.rootScene.addChild(hpLabelArray[uid]);
            
            //バッテリーメータ
            batteryMertorArray;
        }
    }
    
    core.doWaitPhase = function(data){
        var atackUserId = data.atackUserId;
        var newStatusArray = data.statusArray;
        var turn = data.turn;
        for(var uid in newStatusArray) {
            activeBarArray[uid].plus(turn,statusArray[uid].speed);
        }
    };

    return core;
}
