function battleScene(spec,my){
    var that = new Scene();
    that.backgroundColor = "black";
    
    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId; 
    var core = spec.core;
    var charaSpriteArray = {};
    var activeBarArray = {};
    var hpMertorArray = {};
    var batteryMertorArray = {};
    var batteryNumberArray = {};
    var damageLabelArray = {};
    var BatteryCommand;
    var atackIcon;
    var chargeIcon;
    var plusIcon;
    var minusIcon;
    var okIcon;
    var prevIcon;
    var emitCommand = function(){};
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var atackUserId = -1;

    var WAIT_TIME_ACTIVE_RESET = 30;
    initSprite();
    
    function initSprite() {
        for(var uid in statusArray){
            //キャラクタースプライト
            charaSpriteArray[uid] = new Sprite(128, 128);
            charaSpriteArray[uid].image = core.assets[core.PICT_PREFIX+statusArray[uid].pictName];
            charaSpriteArray[uid].x = uid===userId ? 192 : 0;
            charaSpriteArray[uid].y = 80;
            charaSpriteArray[uid].scaleX = uid===userId ? 1 : -1;
            that.addChild(charaSpriteArray[uid]);

            //HPメータ
            hpMertorArray[uid] = hpMertor();
            hpMertorArray[uid].y = 4;
            hpMertorArray[uid].x = uid===userId ? 190 : 10;
            hpMertorArray[uid].setValue(statusArray[uid].hp);
            that.addChild(hpMertorArray[uid]);
            
            //アクティブゲージ
            activeBarArray[uid] = customBar({
                barImage : core.assets[core.PICT_ACTIVE_BAR],
                backImage : core.assets[core.PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===userId ? 'right' : 'left'
            });
            activeBarArray[uid].x = uid===userId ? 190 : 130;
            activeBarArray[uid].y = 22;
            that.addChild(activeBarArray[uid]);
           
            //バッテリーメータ
            batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[core.PICT_BATTERY_GAUGE],
                backImage : core.assets[core.PICT_BATTERY_BACK],
                direction : uid===userId ? 'right' : 'left'
            });
            batteryMertorArray[uid].x = uid===userId ? 190 : 10;
            batteryMertorArray[uid].y = 43;
            batteryMertorArray[uid].setValue(5);
            that.addChild(batteryMertorArray[uid]);
            
            //出したバッテリー
            batteryNumberArray[uid] = new Sprite(64,64);
            batteryNumberArray[uid].image = core.assets[core.PICT_BATTERY_NUMBER];
            batteryNumberArray[uid].x = uid===userId ? 226 : 30;
            batteryNumberArray[uid].y = 110;
            batteryNumberArray[uid].visible = false;
            that.addChild(batteryNumberArray[uid]);
            
            //ダメージラベル
            damageLabelArray[uid] = new MutableText(0,0);
            damageLabelArray[uid].x = uid===userId ? 230 : 20;
            damageLabelArray[uid].y = 210;
            damageLabelArray[uid].visible = false;
            //damageLabelArray[uid].text = '1000';
            that.addChild(damageLabelArray[uid]);
        }
        
        //攻撃アイコン
        atackIcon = new Button('攻撃','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        atackIcon.x = core.COMMAND_POX_X;
        atackIcon.y = core.COMMAND_POS_Y;
        atackIcon.visible = false;
        atackIcon.addEventListener(Event.TOUCH_END,core.moveBatteryCommand);
        that.addChild(atackIcon);
        
        //チャージアイコン
        chargeIcon = new Button('チャージ','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        chargeIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        chargeIcon.y = core.COMMAND_POS_Y;
        chargeIcon.visible = false;
        chargeIcon.addEventListener(Event.TOUCH_END,core.charge);
        that.addChild(chargeIcon);
        
        //+アイコン
        plusIcon = new Button('+','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        plusIcon.x = core.COMMAND_POX_X;
        plusIcon.y = core.COMMAND_POS_Y;
        plusIcon.visible = false;
        plusIcon.addEventListener(Event.TOUCH_END,core.plusBattery);
        that.addChild(plusIcon);
        
        //-アイコン
        minusIcon = new Button('-','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        minusIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        minusIcon.y = core.COMMAND_POS_Y;
        minusIcon.visible = false;
        minusIcon.addEventListener(Event.TOUCH_END,core.minusBattery);
        that.addChild(minusIcon);
        
        //決定アイコン
        okIcon = new Button('決定','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        okIcon.x = core.COMMAND_POX_X;
        okIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        okIcon.visible = false;
        okIcon.addEventListener(Event.TOUCH_END,core.selectBattery);
        that.addChild(okIcon);
        
        //戻るアイコン
        prevIcon = new Button('戻る','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        prevIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        prevIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        prevIcon.visible = false;
        prevIcon.addEventListener(Event.TOUCH_END,core.prevAtackCommand);
        that.addChild(prevIcon);
    }

    that.doWaitPhase = function(data){
        var turn = data.turn;
        atackUserId = data.atackUserId;
        for(var uid in statusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }
        
        that.tl.delay(turn).then(function(){
            refreshMertor(data.statusArray);
            emitCommand({method:'ok'});            
        });
    };
    
    that.doAtackCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            setAtackCommandVisible(true); 
        } else {
            that.tl.delay(1).then(function(){
                emitCommand({method:'ok'});
            });
        }
    };
    
    that.doChargePhase = function(data){
        refreshMertor(data.statusArray);
        that.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
            emitCommand({method:'ok'});
        });
    };
    
    that.doDefenthCommandPhase = function(data){
        refreshMertor(data.statusArray);
        if(atackUserId===userId){
            that.tl.delay(30).then(function(){
                emitCommand({method:'ok'});
            });
        } else {
            viewBatteryCommand();
        }
    };
    
    that.doDamagePhase = function(data){
        var atackBattery = data.atackBattery;
        var defenthBattery = data.defenthBattery;
        var damage = data.damage;
        
        visibleBatteryNumber(atackBattery,defenthBattery);
        that.tl.delay(120).then(function(){
            invisibleBatteryNumber();
            visibleDamage(damage);
            that.tl.delay(120).then(function(){
                invisibleDamage();
                refreshMertor(data.statusArray);
                atackUserId = -1;
                that.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
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
    
    that.onCommand = function(fn) {
        emitCommand = fn;
    };
    
    function refreshMertor(statusArray){
        for(var uid in statusArray){
            hpMertorArray[uid].setValue(statusArray[uid].hp);
            batteryMertorArray[uid].setValue(statusArray[uid].battery);
            activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    that.moveBatteryCommand = function(){
        setAtackCommandVisible(false);
        viewBatteryCommand();
    };
    
    function viewBatteryCommand(){
        setBatteryCommandVisible(true);
        prevIcon.visible = userId===atackUserId ? true : false;
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
    
    that.plusBattery = function(){
        var number = batteryNumberArray[userId].frame;
        if(number<selectMaxBattery){
            batteryNumberArray[userId].frame ++;    
        }
    };
    
    that.minusBattery = function (){
        var number = batteryNumberArray[userId].frame;
        if(selectMinBattery<number){
            batteryNumberArray[userId].frame --;    
        }
    };
    
    that.prevAtackCommand = function(){
        setAtackCommandVisible(true);
        setBatteryCommandVisible(false);
        batteryNumberArray[userId].visible = false;        
    };
    
    that.charge = function(){
        setAtackCommandVisible(false);
        emitCommand({method:'charge'});
    };
    
    that.selectBattery = function(){
        var battery = batteryNumberArray[userId].frame;
        setBatteryCommandVisible(false);
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
    
    function setAtackCommandVisible(visible){
        atackIcon.visible = visible;
        chargeIcon.visible = visible;
    }
    
    function setBatteryCommandVisible(visible){
        plusIcon.visible = visible;
        minusIcon.visible = visible;
        okIcon.visible = visible;
        prevIcon.visible = visible;
    }
    
    return that;
}
