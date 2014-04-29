function game(spec, my) {
    /**
     * ゲームコア
     */
    
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
        
    core.fps = 60;
    core.battleScene = new Scene();
    core.battleScene.backgroundColor = "black";
    core.pushScene(core.battleScene);
    core.roomSelectScene;
    preLoad();
    
    function preLoad() {
        core.preload(PICT_PREFIX+'GranBraver.PNG');
        core.preload(PICT_PREFIX+'Landozer.PNG');
        
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

    /**
     * 戦闘シーン
     */
    var WAIT_TIME_ACTIVE_RESET = 30;

    var statusArray;
    var userId;    
    var charaSpriteArray = {};
    var activeBarArray = {};
    var hpMertorArray = {};
    var batteryMertorArray = {};
    var batteryNumberArray = {};
    var damageLabelArray = {};
    var AtackCommand;
    var BatteryCommand;
    var emitCommand = function(){};
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var atackUserId = -1;

    core.changeBattleScene = function(spec){
        statusArray = $.extend(true, {}, spec.statusArray);
        userId = spec.userId;        
        initSprite();
        
        core.battleScene.addEventListener('enterframe', function(e) {
        });                
    };
    
    function initSprite() {
        for(var uid in statusArray){
            //キャラクタースプライト
            charaSpriteArray[uid] = new Sprite(128, 128);
            charaSpriteArray[uid].image = core.assets[PICT_PREFIX+statusArray[uid].pictName];
            charaSpriteArray[uid].x = uid===userId ? 192 : 0;
            charaSpriteArray[uid].y = 80;
            charaSpriteArray[uid].scaleX = uid===userId ? 1 : -1;
            core.battleScene.addChild(charaSpriteArray[uid]);

            //HPメータ
            hpMertorArray[uid] = hpMertor();
            hpMertorArray[uid].y = 4;
            hpMertorArray[uid].x = uid===userId ? 190 : 10;
            hpMertorArray[uid].setValue(statusArray[uid].hp);
            core.battleScene.addChild(hpMertorArray[uid]);            
            
            //アクティブゲージ
            activeBarArray[uid] = customBar({
                barImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR],
                backImage : core.assets[PICT_PREFIX + PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===userId ? 'right' : 'left'
            });
            activeBarArray[uid].x = uid===userId ? 190 : 130;
            activeBarArray[uid].y = 22;
            core.battleScene.addChild(activeBarArray[uid]);
           
            //バッテリーメータ
            batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[PICT_PREFIX + PICT_BATTERY_GAUGE],
                backImage : core.assets[PICT_PREFIX + PICT_BATTERY_BACK],
                direction : uid===userId ? 'right' : 'left'
            });
            batteryMertorArray[uid].x = uid===userId ? 190 : 10;
            batteryMertorArray[uid].y = 43;
            batteryMertorArray[uid].setValue(5);
            core.battleScene.addChild(batteryMertorArray[uid]);
            
            //出したバッテリー
            batteryNumberArray[uid] = new Sprite(64,64);
            batteryNumberArray[uid].image = core.assets[PICT_PREFIX + PICT_BATTERY_NUMBER];
            batteryNumberArray[uid].x = uid===userId ? 226 : 30;
            batteryNumberArray[uid].y = 110;
            batteryNumberArray[uid].visible = false;
            core.battleScene.addChild(batteryNumberArray[uid]);
            
            //ダメージラベル
            damageLabelArray[uid] = new MutableText(0,0);
            damageLabelArray[uid].x = uid===userId ? 230 : 20;
            damageLabelArray[uid].y = 210;
            damageLabelArray[uid].visible = false;
            //damageLabelArray[uid].text = '1000';
            core.battleScene.addChild(damageLabelArray[uid]);
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
           core.moveBatteryCommand();
        });
        AtackCommand.onPushChargeButton(function() {
            core.charge();
        });        
        core.battleScene.addChild(AtackCommand);
        
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
            core.plusBattery();
        });
        BatteryCommand.onPushMinuxButton(function() {
            core.minusBattery();
        });
        BatteryCommand.onPushPrevButton(function() {
            core.prevAtackCommand();
        });
        BatteryCommand.onPushOkButton(function() {
            core.selectBattery();
        });        
        core.battleScene.addChild(BatteryCommand);
    }

    core.doWaitPhase = function(data){
        var turn = data.turn;
        atackUserId = data.atackUserId;
        for(var uid in statusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }
        
        core.battleScene.tl.delay(turn).then(function(){
            refreshMertor(data.statusArray);
            emitCommand({method:'ok'});            
        });
    };
    
    core.doAtackCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            AtackCommand.setVisible(true);    
        } else {
            core.battleScene.tl.delay(1).then(function(){
                emitCommand({method:'ok'});
            });
        }
    };
    
    core.doChargePhase = function(data){
        refreshMertor(data.statusArray);
        core.battleScene.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
            emitCommand({method:'ok'});
        });
    };
    
    core.doDefenthCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            core.battleScene.tl.delay(30).then(function(){
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
        core.battleScene.tl.delay(120).then(function(){
            invisibleBatteryNumber();
            visibleDamage(damage);
            core.battleScene.tl.delay(120).then(function(){
                invisibleDamage();
                refreshMertor(data.statusArray);
                atackUserId = -1;
                core.battleScene.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
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
                hpMertorArray[uid].setValue(statusArray[uid].hp);
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
    
    function refreshMertor(statusArray){
        for(var uid in statusArray){
            hpMertorArray[uid].setValue(statusArray[uid].hp);
            batteryMertorArray[uid].setValue(statusArray[uid].battery);
            activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    core.moveBatteryCommand = function(){
        AtackCommand.setVisible(false);
        viewBatteryCommand();
    };
    
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
    
    core.plusBattery = function(){
        var number = batteryNumberArray[userId].frame;
        if(number<selectMaxBattery){
            batteryNumberArray[userId].frame ++;    
        }
    };
    
    core.minusBattery = function (){
        var number = batteryNumberArray[userId].frame;
        if(selectMinBattery<number){
            batteryNumberArray[userId].frame --;    
        }
    };
    
    core.prevAtackCommand = function(){
        AtackCommand.setVisible(true);
        BatteryCommand.setVisible(false);
        batteryNumberArray[userId].visible = false;        
    };
    
    core.charge = function(){
        AtackCommand.setVisible(false);
        emitCommand({method:'charge'});
    };
    
    core.selectBattery = function(){
        var battery = batteryNumberArray[userId].frame;
        BatteryCommand.setVisible(false);
        batteryNumberArray[userId].visible = false;
        
        if(atackUserId===userId){
            sendAtackCommand(battery);
        } else {
            sendDefenthCommand(battery);
        }
    };
    
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


    /**
     * ルームセレクト
     */
    
    core.changeRoomSelectScene = function(spec){
        core.roomSelectScene = new roomSelectScene(spec);
        core.replaceScene(core.roomSelectScene);
    };
    
    return core;
}
