function game(spec, my) {
    /**
     * ゲームコア
     */
    var core = new Core(320, 480);
    
    //TODO : 戦闘画面の画像パス定数もcore.XXXXXのようにパブリック関数化したい
    //       また、画像パス定数の値をPICT_PREFIX+XXXXのようにフルパスにしたい
    core.PICT_PREFIX = location.origin + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
    core.ICON_WIDTH = 124;
    core.ICON_HEIGHT = 40;
    core.COMMAND_POX_X = 8;
    core.COMMAND_POS_Y = 300;
        
    core.fps = 60;
    core.battleScene = new Scene();
    core.roomSelectScene;
    preLoad();
    
    function preLoad() {
        //戦闘画面
        core.preload(core.PICT_PREFIX+'GranBraver.PNG');
        core.preload(core.PICT_PREFIX+'Landozer.PNG');
        core.preload(core.PICT_ACTIVE_BAR);
        core.preload(core.PICT_ACTIVE_BAR_BACK);
        core.preload(core.PICT_BATTERY_GAUGE);
        core.preload(core.PICT_BATTERY_BACK);
        core.preload(core.PICT_BATTERY_NUMBER); 
    }

    core.changeBattleScene = function(spec){
        spec.core = core;
        core.battleScene = new battleScene(spec);
        core.pushScene(core.battleScene);             
    };

    /**
     * 戦闘シーン
     */
    /*
    var WAIT_TIME_ACTIVE_RESET = 30;

    var statusArray;
    var userId;    
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

    core.changeBattleScene = function(spec){
        core.battleScene.backgroundColor = "black";
        core.pushScene(core.battleScene);
        statusArray = $.extend(true, {}, spec.statusArray);
        userId = spec.userId;        
        initSprite();                
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
        
        //攻撃アイコン
        atackIcon = new Button('攻撃','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        atackIcon.x = core.COMMAND_POX_X;
        atackIcon.y = core.COMMAND_POS_Y;
        atackIcon.visible = false;
        atackIcon.addEventListener(Event.TOUCH_END,core.moveBatteryCommand);
        core.battleScene.addChild(atackIcon);
        
        //チャージアイコン
        chargeIcon = new Button('チャージ','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        chargeIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        chargeIcon.y = core.COMMAND_POS_Y;
        chargeIcon.visible = false;
        chargeIcon.addEventListener(Event.TOUCH_END,core.charge);
        core.battleScene.addChild(chargeIcon);
        
        //+アイコン
        plusIcon = new Button('+','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        plusIcon.x = core.COMMAND_POX_X;
        plusIcon.y = core.COMMAND_POS_Y;
        plusIcon.visible = false;
        plusIcon.addEventListener(Event.TOUCH_END,core.plusBattery);
        core.battleScene.addChild(plusIcon);
        
        //-アイコン
        minusIcon = new Button('-','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        minusIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        minusIcon.y = core.COMMAND_POS_Y;
        minusIcon.visible = false;
        minusIcon.addEventListener(Event.TOUCH_END,core.minusBattery);
        core.battleScene.addChild(minusIcon);
        
        //決定アイコン
        okIcon = new Button('決定','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        okIcon.x = core.COMMAND_POX_X;
        okIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        okIcon.visible = false;
        okIcon.addEventListener(Event.TOUCH_END,core.selectBattery);
        core.battleScene.addChild(okIcon);
        
        //戻るアイコン
        prevIcon = new Button('戻る','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        prevIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        prevIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        prevIcon.visible = false;
        prevIcon.addEventListener(Event.TOUCH_END,core.prevAtackCommand);
        core.battleScene.addChild(prevIcon);
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
            setAtackCommandVisible(true); 
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
        setAtackCommandVisible(true);
        setBatteryCommandVisible(false);
        batteryNumberArray[userId].visible = false;        
    };
    
    core.charge = function(){
        setAtackCommandVisible(false);
        emitCommand({method:'charge'});
    };
    
    core.selectBattery = function(){
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
    */

    /**
     * ルームセレクト
     */
    core.changeRoomSelectScene = function(spec){
        spec.core = core;
        core.roomSelectScene = new roomSelectScene(spec);
        core.replaceScene(core.roomSelectScene);
        core.roomSelectScene.initSprite();//TODO : initSprite()をchangeRoom()の中で実行したい。
    };
    
    //TODO : roomSelectSceneの存在確認チェックを入れたい
    core.onEnterRoom = function(fn){
        core.roomSelectScene.onEnterRoom(fn);
    };
    
    return core;
}
