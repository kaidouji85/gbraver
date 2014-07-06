//TODO : 自分が出したバッテリーが消えることがあった。原因不明。
//       バッテリーが消える場合でも、visibleはtrueに設定してあった。
//       frameも範囲外（０から5以外)が指定された訳でもない。
//       enchant.jsの不具合の可能性が高い。
function battleScene(spec,my){
    var that = new Scene();
    that.backgroundColor = "black";
    that.atackIcon = {};
    that.chargeIcon = {};
    that.plusIcon = {};
    that.minusIcon = {};
    that.okIcon = {};
    that.prevIcon = {};
    that.charaSpriteArray = {};
    that.statusArray = $.extend(true, {}, spec.statusArray);
    that.userId = spec.userId;
    that.activeBarArray = {};
    that.hpMertorArray = {};
    that.batteryMertorArray = {};
    that.batteryNumberArray = {};
    that.damageLabelArray = {};

    that.doWaitPhase = doWaitPhase;
    that.doAtackCommandPhase = doAtackCommandPhase;
    that.doChargePhase = doChargePhase;
    that.doDefenthCommandPhase = doDefenthCommandPhase;
    that.doDamagePhase = doDamagePhase;
    that.onCommand = onCommand;
    that.doGameEnd = doGameEnd;
    that.refreshMertor = refreshMertor;

    var core = enchant.Core.instance;
    var emitCommand = function(){};
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var attackUserId = -1;
    var AttackAnime = attackAnime({
        battleScene : that
    });

    var WAIT_TIME_ACTIVE_RESET = 30;
    var ICON_WIDTH = 124;
    var ICON_HEIGHT = 40;
    var COMMAND_POX_X = 8;
    var COMMAND_POS_Y = 300;
    var FRAME_STAND = 0;
    var FRAME_ATTACK = 1;
    var FRAME_DAMAGE = 2;
    
    initSprite();
    function initSprite() {
        for(var uid in that.statusArray){
            //キャラクタースプライト
            var spec = {
                pict : core.assets[core.PICT_PREFIX+that.statusArray[uid].pictName],
                direction : uid===that.userId ? 'right' : 'left'
            };
            that.charaSpriteArray[uid] = new ArmdozerSprite(spec);
            that.addChild(that.charaSpriteArray[uid]);

            //HPメータ
            that.hpMertorArray[uid] = hpMertor();
            that.hpMertorArray[uid].y = 4;
            that.hpMertorArray[uid].x = uid===that.userId ? 190 : 10;
            that.hpMertorArray[uid].setValue(that.statusArray[uid].hp);
            that.addChild(that.hpMertorArray[uid]);
            
            //アクティブゲージ
            that.activeBarArray[uid] = customBar({
                barImage : core.assets[core.PICT_ACTIVE_BAR],
                backImage : core.assets[core.PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.activeBarArray[uid].x = uid===that.userId ? 190 : 130;
            that.activeBarArray[uid].y = 22;
            that.addChild(that.activeBarArray[uid]);
           
            //バッテリーメータ
            that.batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[core.PICT_BATTERY_GAUGE],
                backImage : core.assets[core.PICT_BATTERY_BACK],
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.batteryMertorArray[uid].x = uid===that.userId ? 190 : 10;
            that.batteryMertorArray[uid].y = 43;
            that.batteryMertorArray[uid].setValue(5);
            that.addChild(that.batteryMertorArray[uid]);
            
            //出したバッテリー
            that.batteryNumberArray[uid] = new Sprite(64,64);
            that.batteryNumberArray[uid].image = core.assets[core.PICT_BATTERY_NUMBER];
            that.batteryNumberArray[uid].x = uid===that.userId ? 226 : 30;
            that.batteryNumberArray[uid].y = 110;
            that.batteryNumberArray[uid].visible = false;
            that.addChild(that.batteryNumberArray[uid]);
            
            //ダメージラベル
            that.damageLabelArray[uid] = new MutableText(0,0);
            that.damageLabelArray[uid].x = uid===that.userId ? 230 : 20;
            that.damageLabelArray[uid].y = 210;
            that.damageLabelArray[uid].visible = false;
            that.addChild(that.damageLabelArray[uid]);
        }
        
        //攻撃アイコン
        that.atackIcon = new Button('攻撃','light',ICON_HEIGHT,ICON_WIDTH);
        that.atackIcon.x = COMMAND_POX_X;
        that.atackIcon.y = COMMAND_POS_Y;
        that.atackIcon.visible = false;
        that.atackIcon.addEventListener(Event.TOUCH_END,moveBatteryCommand);
        that.addChild(that.atackIcon);
        
        //チャージアイコン
        that.chargeIcon = new Button('チャージ','light',ICON_HEIGHT,ICON_WIDTH);
        that.chargeIcon.x = COMMAND_POX_X + ICON_WIDTH + 32;
        that.chargeIcon.y = COMMAND_POS_Y;
        that.chargeIcon.visible = false;
        that.chargeIcon.addEventListener(Event.TOUCH_END,charge);
        that.addChild(that.chargeIcon);
        
        //+アイコン
        that.plusIcon = new Button('+','light',ICON_HEIGHT,ICON_WIDTH);
        that.plusIcon.x = COMMAND_POX_X;
        that.plusIcon.y = COMMAND_POS_Y;
        that.plusIcon.visible = false;
        that.plusIcon.addEventListener(Event.TOUCH_END,plusBattery);
        that.addChild(that.plusIcon);
        
        //-アイコン
        that.minusIcon = new Button('-','light',ICON_HEIGHT,ICON_WIDTH);
        that.minusIcon.x = COMMAND_POX_X + ICON_WIDTH + 32;
        that.minusIcon.y = COMMAND_POS_Y;
        that.minusIcon.visible = false;
        that.minusIcon.addEventListener(Event.TOUCH_END,minusBattery);
        that.addChild(that.minusIcon);
        
        //決定アイコン
        that.okIcon = new Button('決定','light',ICON_HEIGHT,ICON_WIDTH);
        that.okIcon.x = COMMAND_POX_X;
        that.okIcon.y = COMMAND_POS_Y + ICON_HEIGHT + 16;
        that.okIcon.visible = false;
        that.okIcon.addEventListener(Event.TOUCH_END,selectBattery);
        that.addChild(that.okIcon);
                
        //戻るアイコン
        that.prevIcon = new Button('戻る','light',ICON_HEIGHT,ICON_WIDTH);
        that.prevIcon.x = COMMAND_POX_X + ICON_WIDTH + 32;
        that.prevIcon.y = COMMAND_POS_Y + ICON_HEIGHT + 16;
        that.prevIcon.visible = false;
        that.prevIcon.addEventListener(Event.TOUCH_END,prevAtackCommand);
        that.addChild(that.prevIcon);
    }
    
    function doWaitPhase(data){
        var turn = data.turn;
        attackUserId = data.atackUserId;
        for(var uid in that.statusArray) {
            that.activeBarArray[uid].plus(turn,120*that.statusArray[uid].speed/5000);
        }
        
        that.tl.delay(turn).then(function(){
            refreshMertor(data.statusArray);
            emitCommand({method:'ok'});            
        });
    };
    
    function doAtackCommandPhase(data){
        refreshMertor(data.statusArray);
        that.charaSpriteArray[attackUserId].frame = FRAME_ATTACK;
        if(attackUserId===that.userId){
            setAtackCommandVisible(true);
        } else {
            that.tl.delay(1).then(function(){
                emitCommand({method:'ok'});
            });
        }
    };
    
    function doChargePhase(data){
        refreshMertor(data.statusArray);
        that.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
            that.charaSpriteArray[attackUserId].frame = FRAME_STAND;
            attackUserId = '';
            emitCommand({method:'ok'});
        });
    };
    
    function doDefenthCommandPhase(data){
        refreshMertor(data.statusArray);
        if(attackUserId===that.userId){
            that.tl.delay(30).then(function(){
                emitCommand({method:'ok'});
            });
        } else {
            viewBatteryCommand();
        }
    };
    
    function doDamagePhase(data){
        data.attackUserId = attackUserId;
        AttackAnime.play(data,function(){
            emitCommand({method:'ok'});
        });
    };
    
    function onCommand(fn) {
        emitCommand = fn;
    };
    
    function refreshMertor(statusArray){
        for(var uid in statusArray){
            that.hpMertorArray[uid].setValue(statusArray[uid].hp);
            that.batteryMertorArray[uid].setValue(statusArray[uid].battery);
            that.activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    function moveBatteryCommand(){
        setAtackCommandVisible(false);
        viewBatteryCommand();
    };
    
    function viewBatteryCommand(){
        setBatteryCommandVisible(true);
        that.prevIcon.visible = that.userId===attackUserId ? true : false;
        that.batteryNumberArray[that.userId].visible = true;
        selectMaxBattery = getSelectMaxBattery();
        selectMinBattery = getSelectMinBattery();
        that.batteryNumberArray[that.userId].frame = that.batteryMertorArray[that.userId].getValue()>0 ? 1 : 0;
    }
    
    function getSelectMaxBattery(){
        return that.batteryMertorArray[that.userId].getValue();;
    }
    
    function getSelectMinBattery(){
        return that.userId===attackUserId ? 1 : 0;
    }
    
    function plusBattery(){
        var number = that.batteryNumberArray[that.userId].frame;
        if(number<selectMaxBattery){
            that.batteryNumberArray[that.userId].frame ++;    
        }
    };
    
    function minusBattery(){
        var number = that.batteryNumberArray[that.userId].frame;
        if(selectMinBattery<number){
            that.batteryNumberArray[that.userId].frame --;    
        }
    };
    
    function prevAtackCommand(){
        setAtackCommandVisible(true);
        setBatteryCommandVisible(false);
        that.batteryNumberArray[that.userId].visible = false;        
    };
    
    function charge(){
        setAtackCommandVisible(false);
        emitCommand({method:'charge'});
    };
    
    function selectBattery(){
        var battery = that.batteryNumberArray[that.userId].frame;
        setBatteryCommandVisible(false);
        that.batteryNumberArray[that.userId].visible = false;
        
        if(attackUserId===that.userId){
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
        that.atackIcon.visible = visible;
        that.chargeIcon.visible = visible;
    }
    
    function setBatteryCommandVisible(visible){
        that.plusIcon.visible = visible;
        that.minusIcon.visible = visible;
        that.okIcon.visible = visible;
        that.prevIcon.visible = visible;
    }

    function doGameEnd(data){
        refreshMertor(data.statusArray);
        that.tl.delay(60).then(function(){
            emitCommand({method:'ok'});
        });
    }
    
    return that;
}