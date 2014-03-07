function game(spec, my) {
    var PICT_PREFIX = location.origin + '/images/';
    var PICT_ACTIVE_BAR = 'activeBar.png';
    var PICT_ACTIVE_BAR_BACK = 'activeBack.png';
    var PICT_BATTERY_GAUGE = 'batteryGauge.png';
    var PICT_BATTERY_BACK = 'batteryBack.png';

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
        core.preload(PICT_PREFIX+PICT_ACTIVE_BAR_BACK);
        core.preload(PICT_PREFIX+PICT_BATTERY_GAUGE);
        core.preload(PICT_PREFIX+PICT_BATTERY_BACK);
    }

    function initSprite() {
        for(var uid in statusArray){
            //キャラクタースプライト
            charaSpriteArray[uid] = new Sprite(128, 128);
            charaSpriteArray[uid].image = core.assets[PICT_PREFIX+statusArray[uid].pictName];
            charaSpriteArray[uid].x = uid===userId ? 192 : 0;
            charaSpriteArray[uid].y = 80;
            charaSpriteArray[uid].scaleX = uid===userId ? 1 : -1;
            core.rootScene.addChild(charaSpriteArray[uid]);
            
            //HPラベル
            hpLabelArray[uid] = new MutableText(0,0);
            hpLabelArray[uid].y = 4;
            hpLabelArray[uid].x = uid===userId ? 190 : 10;
            hpLabelArray[uid].text = 'HP '+statusArray[uid].hp;
            core.rootScene.addChild(hpLabelArray[uid]);            
            
            //アクティブゲージ
            activeBarArray[uid] = customBar({
                barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
                backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===userId ? 'right' : 'left'
            });
            activeBarArray[uid].x = uid===userId ? 190 : 130;
            activeBarArray[uid].y = 22;
            core.rootScene.addChild(activeBarArray[uid]);
           
            //バッテリーメータ
            batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[PICT_PREFIX + PICT_BATTERY_GAUGE],
                backImage : core.assets[PICT_PREFIX + PICT_BATTERY_BACK],
                direction : uid===userId ? 'right' : 'left'
            });
            batteryMertorArray[uid].x = uid===userId ? 190 : 10;
            batteryMertorArray[uid].y = 43;
            batteryMertorArray[uid].setValue(5);
            core.rootScene.addChild(batteryMertorArray[uid]);
            
        }
    }
    
    core.doWaitPhase = function(data){
        var atackUserId = data.atackUserId;
        var newStatusArray = data.statusArray;
        var turn = data.turn;
        for(var uid in newStatusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }
    };

    return core;
}
