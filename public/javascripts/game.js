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
    var WAIT_TIME_ACTIVE_RESET = 30;

    var core = new Core(320, 320);
    var startAtackCommandFrame = -1;
    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var charaSpriteArray = {};
    var activeBarArray = {};
    var hpLabelArray = {};
    var batteryMertorArray = {};
    var batteryNumberArray = {};
    var damageLabelArray = {};
    var AtackCommand;
    var BatteryCommand;
    var emitReady = function(){};
    var emitFrameEvent = function(){};
    var emitCommand = function(){};
    var emitFrame = -1;
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var atackUserId = -1;
        
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
        var turn = data.turn;
        atackUserId = data.atackUserId;
        for(var uid in statusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }        
        setFrameCountEvent(core.frame + turn,function(){
            refreshMertor(data.statusArray);
            emitCommand({method:'ok'});
        });
    };
    
    core.doAtackCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            AtackCommand.setVisible(true);    
        } else {
            setFrameCountEvent(core.frame + 1, function(){
                emitCommand({method:'ok'});
            });
        }
    };
    
    core.doChargePhase = function(data){
        refreshMertor(data.statusArray);
        setFrameCountEvent(core.frame + WAIT_TIME_ACTIVE_RESET, function(){
            emitCommand({method:'ok'});
        });
    };
    
    core.doDefenthCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            setFrameCountEvent(core.frame + 30, function(){
                emitCommand({method:'ok'});
            });
        } else {
            viewBatteryCommand();
        }
    };
    
    core.doDamagePhase = function(data){
        var atackBattery = data.atackBattery;
        var defenthBattery = data.defenthBattery;
        var damage = data.damage;
        
        visibleBatteryNumber(atackBattery,defenthBattery);
        setFrameCountEvent(core.frame + 120, function(){
            invisibleBatteryNumber();
            visibleDamage(damage);
            setFrameCountEvent(core.frame + 120,function(){
                invisibleDamage();
                refreshMertor(data.statusArray);
                atackUserId = -1;
                setFrameCountEvent(core.frame + WAIT_TIME_ACTIVE_RESET,function(){
                    emitCommand({method:'ok'});
                });
            });
        });
    };
    
    function visibleBatteryNumber(atackBattery,defenthBattery){
        for(var uid in statusArray){
            var battery = batteryMertorArray[uid].getValue();
            battery -= uid===atackUserId ? atackBattery : defenthBattery;
            batteryMertorArray[uid].setValue(battery);
            batteryNumberArray[uid].frame = uid===atackUserId ? atackBattery : defenthBattery;
            batteryNumberArray[uid].visible = true;
        }
    }
    
    function invisibleBatteryNumber(){
        for (var uid in batteryNumberArray) {
            batteryNumberArray[uid].visible = false;
        }
    }
    
    function visibleDamage(damage){
        for (var uid in statusArray) {
            if (uid !== atackUserId) {
                damageLabelArray[uid].visible = true;
                damageLabelArray[uid].text = String(damage);
                statusArray[uid].hp -= damage;
                hpLabelArray[uid].text = 'HP '+statusArray[uid].hp;
                break;
            }
        }
    }
    
    function invisibleDamage(){
        for (var uid in statusArray) {
            if (uid !== atackUserId) {
                damageLabelArray[uid].visible = false;
                break;
            }
        }        
    }
    
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
            
            //ダメージラベル
            damageLabelArray[uid] = new MutableText(0,0);
            damageLabelArray[uid].x = uid===userId ? 230 : 20;
            damageLabelArray[uid].y = 210;
            damageLabelArray[uid].visible = false;
            //damageLabelArray[uid].text = '1000';
            core.rootScene.addChild(damageLabelArray[uid]);
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
        BatteryCommand.onPushOkButton(function() {
            selectBattery();
        });        
        core.rootScene.addChild(BatteryCommand);
    }
    
    function refreshMertor(statusArray){
        for(var uid in statusArray){
            hpLabelArray[uid].text = 'HP ' + statusArray[uid].hp;
            batteryMertorArray[uid].setValue(statusArray[uid].battery);
            activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    function moveBatteryCommand(){
        AtackCommand.setVisible(false);
        viewBatteryCommand();
    }
    
    function viewBatteryCommand(){
        BatteryCommand.setVisible(true);
        BatteryCommand.setPrevButtonVisible(userId===atackUserId ? true : false);
        batteryNumberArray[userId].visible = true;
        selectMaxBattery = getSelectMaxBattery();
        selectMinBattery = getSelectMinBattery();
        batteryNumberArray[userId].frame = batteryMertorArray[userId].getValue()>0 ? 1 : 0;
        
    }
    
    function getSelectMaxBattery(){
        return batteryMertorArray[userId].getValue();;
    }
    
    function getSelectMinBattery(){
        return userId===atackUserId ? 1 : 0;
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
    
    function selectBattery(){
        var battery = batteryNumberArray[userId].frame;
        BatteryCommand.setVisible(false);
        batteryNumberArray[userId].visible = false;
        
        if(atackUserId===userId){
            sendAtackCommand(battery);
        } else {
            sendDefenthCommand(battery);
        }
    }
    
    function sendAtackCommand(battery){
        emitCommand({
            method : 'atack',
            param : {
                battery : battery
            }
        });
    }
    
    function sendDefenthCommand(battery){
        emitCommand({
            method : 'defenth',
            param : {
                battery : battery
            }
        });        
    }

    return core;
}
