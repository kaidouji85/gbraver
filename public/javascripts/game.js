function game(spec, my) {
    var PICT_PREFIX = location.origin + '/images/';
    var PICT_ACTIVE_BAR = 'activeBar.png';
    var PICT_ACTIVE_BAR_BACK = 'activeBack.png';
    var PICT_BATTERY_GAUGE = 'batteryGauge.png';
    var PICT_BATTERY_BACK = 'batteryBack.png';
    var PICT_ICON_ATACK = 'iconAtack.png';
    var PICT_ICON_CHARGE = 'iconCharge.png';
    var PICT_ICON_PLUS = 'iconPlus.png';
    var PICT_ICON_MINUS = 'iconMinus.png';
    var PICT_ICON_OK = 'iconOk.png';
    var PICT_BATTERY_NUMBER = 'batteryNumber.png';
    var PICT_ICON_PREV = 'iconPrev.png';

    var core = new Core(320, 320);
    var startAtackCommandFrame = -1;
    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var charaSpriteArray = {};
    var activeBarArray = {};
    var hpLabelArray = {};
    var batteryMertorArray = {};
    var batteryNumberArray = {};
    var AtackCommand;
    var BatteryCommand;
    var emitReady = function(){};
    var emitFrameEvent = function(){};
    var emitCommand = function(){};
    var emitFrame = -1;
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
        
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    preLoad();
    core.onload = function() {
        initSprite();
        emitReady();
        core.rootScene.addEventListener('enterframe', function(e) {
            if(core.frame===emitFrame){
                emitFrameEvent();
            }
        });
    };

    core.onReady = function(fn){
        emitReady = fn;
    };

    core.doWaitPhase = function(data){
        var atackUserId = data.atackUserId;
        var newStatusArray = data.statusArray;
        var turn = data.turn;
        for(var uid in newStatusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }
        setFrameCountEvent(core.frame + turn,function(){
            emitCommand({method:'ok'});
        });
    };
    
    core.doAtackCommandPhase = function(data){
        AtackCommand.setVisible(true);
    };
    
    core.doChargePhase = function(data){
        for(var uid in data.statusArray){
            hpLabelArray[uid].text = 'HP ' + data.statusArray[uid].hp;
            batteryMertorArray[uid].setValue(data.statusArray[uid].battery);
            activeBarArray[uid].setValue(120*data.statusArray[uid].active/5000);
            setFrameCountEvent(core.frame + 10, function(){
                emitCommand({method:'ok'});
            });
        } 
    };
    
    core.onCommand = function(fn) {
        emitCommand = fn;
    };

    function setFrameCountEvent(frame,fnc){
        emitFrame = frame;
        emitFrameEvent = fnc;
    }

    function preLoad() {
        for (var uid in statusArray) {
            core.preload(PICT_PREFIX + statusArray[uid].pictName);
        }
        core.preload(PICT_PREFIX+PICT_ACTIVE_BAR);
        core.preload(PICT_PREFIX+PICT_ACTIVE_BAR_BACK);
        core.preload(PICT_PREFIX+PICT_BATTERY_GAUGE);
        core.preload(PICT_PREFIX+PICT_BATTERY_BACK);
        core.preload(PICT_PREFIX+PICT_ICON_ATACK);
        core.preload(PICT_PREFIX+PICT_ICON_CHARGE);
        core.preload(PICT_PREFIX+PICT_ICON_PLUS);
        core.preload(PICT_PREFIX+PICT_ICON_MINUS);
        core.preload(PICT_PREFIX+PICT_ICON_OK);
        core.preload(PICT_PREFIX+PICT_BATTERY_NUMBER); 
        core.preload(PICT_PREFIX + PICT_ICON_PREV);
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
            
            //出したバッテリー
            batteryNumberArray[uid] = new Sprite(64,64);
            batteryNumberArray[uid].image = core.assets[PICT_PREFIX + PICT_BATTERY_NUMBER];
            batteryNumberArray[uid].x = uid===userId ? 226 : 30;
            batteryNumberArray[uid].y = 110;
            batteryNumberArray[uid].visible = false;
            core.rootScene.addChild(batteryNumberArray[uid]);
        }
        
        //攻撃コマンド
        AtackCommand = atackCommand({
            atackImage : core.assets[PICT_PREFIX + PICT_ICON_ATACK],
            chargeImage : core.assets[PICT_PREFIX + PICT_ICON_CHARGE]
        });
        AtackCommand.setVisible(false);
        AtackCommand.x = 100;
        AtackCommand.y = 80;
        AtackCommand.onPushAtackButton(function(){
           moveBatteryCommand();
        });
        AtackCommand.onPushChargeButton(function() {
            charge();
        });        
        core.rootScene.addChild(AtackCommand);
        
        //バッテリーコマンド
        BatteryCommand = batteryCommand({
           plusImage : core.assets[PICT_PREFIX+PICT_ICON_PLUS],
           minusImage : core.assets[PICT_PREFIX+PICT_ICON_MINUS],
           okImage : core.assets[PICT_PREFIX+PICT_ICON_OK],
           prevImage : core.assets[PICT_PREFIX + PICT_ICON_PREV]
        });
        BatteryCommand.setVisible(false);
        BatteryCommand.x = 100;
        BatteryCommand.y = 80;
        BatteryCommand.onPushPlusButton(function() {
            plusBattery();
        });
        BatteryCommand.onPushMinuxButton(function() {
            minusBattery();
        });
        BatteryCommand.onPushPrevButton(function() {
            prevAtackCommand();
        });        
        core.rootScene.addChild(BatteryCommand);
    }
    
    function moveBatteryCommand(){
        AtackCommand.setVisible(false);
        BatteryCommand.setVisible(true);
        batteryNumberArray[userId].visible = true;
        selectMaxBattery = getSelectMaxBatteryForAtack();
        selectMinBattery = getSelectMinBatteryForAtack();
        batteryNumberArray[userId].frame = selectMinBattery;
    }
    
    function getSelectMaxBatteryForAtack(){
        return statusArray[userId].battery;
    }
    
    function getSelectMinBatteryForAtack(){
        return 1;
    }
    
    function plusBattery(){
        var number = batteryNumberArray[userId].frame;
        if(number<selectMaxBattery){
            batteryNumberArray[userId].frame ++;    
        }
    }
    
    function minusBattery(){
        var number = batteryNumberArray[userId].frame;
        if(selectMinBattery<number){
            batteryNumberArray[userId].frame --;    
        }
    }
    
    function prevAtackCommand(){
        AtackCommand.setVisible(true);
        BatteryCommand.setVisible(false);
        batteryNumberArray[userId].visible = false;        
    }
    
    function charge(){
        AtackCommand.setVisible(false);
        emitCommand({method:'charge'});
    }

    return core;
}
