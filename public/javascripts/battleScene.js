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
    that.doWaitPhase = doWaitPhase;
    that.doAtackCommandPhase = doAtackCommandPhase;
    that.doChargePhase = doChargePhase;
    that.doDefenthCommandPhase = doDefenthCommandPhase;
    that.doDamagePhase = doDamagePhase;
    that.onCommand = onCommand;
    that.doGameEnd = doGameEnd;
    that.charaSpriteArray = {};

    var statusArray = $.extend(true, {}, spec.statusArray);
    var userId = spec.userId;
    var core = enchant.Core.instance;
    var activeBarArray = {};
    var hpMertorArray = {};
    var batteryMertorArray = {};
    var batteryNumberArray = {};
    var damageLabelArray = {};
    var emitCommand = function(){};
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var attackUserId = -1;

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
        for(var uid in statusArray){
            //キャラクタースプライト
            var spec = {
                pict : core.assets[core.PICT_PREFIX+statusArray[uid].pictName],
                direction : uid===userId ? 'right' : 'left'
            };
            that.charaSpriteArray[uid] = new ArmdozerSprite(spec);
            that.addChild(that.charaSpriteArray[uid]);

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
            that.addChild(damageLabelArray[uid]);
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
        for(var uid in statusArray) {
            activeBarArray[uid].plus(turn,120*statusArray[uid].speed/5000);
        }
        
        that.tl.delay(turn).then(function(){
            refreshMertor(data.statusArray);
            emitCommand({method:'ok'});            
        });
    };
    
    function doAtackCommandPhase(data){
        refreshMertor(data.statusArray);
        that.charaSpriteArray[attackUserId].frame = FRAME_ATTACK;
        if(attackUserId===userId){
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
        if(attackUserId===userId){
            that.tl.delay(30).then(function(){
                emitCommand({method:'ok'});
            });
        } else {
            viewBatteryCommand();
        }
    };
    
    function doDamagePhase(data){
        var atackBattery = data.atackBattery;
        var defenthBattery = data.defenthBattery;
        var damage = data.damage;

        that.tl.then(viewBattery)
            .delay(120).then(startAttackMotion)
            .delay(30).then(viewDamage)
            .delay(120).then(endAnime);

        function viewBattery(){
            visibleBatteryNumber(atackBattery,defenthBattery);
        }

        function startAttackMotion(){
            invisibleBatteryNumber();
            playAttackHitAnime();
        }

        function viewDamage(){
            visibleDamage(damage);
        }

        function endAnime(){
            refreshMertor(data.statusArray);
            invisibleDamage();
            doStand();
            attackUserId = '';
            emitCommand({method:'ok'});
        }

        function visibleBatteryNumber(atackBattery,defenthBattery){
            for(var uid in statusArray){
                var battery = batteryMertorArray[uid].getValue();
                battery -= uid===attackUserId ? atackBattery : defenthBattery;
                batteryMertorArray[uid].setValue(battery);
                batteryNumberArray[uid].frame = uid===attackUserId ? atackBattery : defenthBattery;
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
                if (uid !== attackUserId) {
                    damageLabelArray[uid].visible = true;
                    damageLabelArray[uid].text = String(damage);
                    statusArray[uid].hp -= damage;
                    hpMertorArray[uid].setValue(statusArray[uid].hp);
                    break;
                }
            }
        }

        function playAttackHitAnime() {
            for(var uid in that.charaSpriteArray){
                if(uid===attackUserId){
                    that.charaSpriteArray[uid].doAttackMotion();
                } else {
                    that.charaSpriteArray[uid].doHitMotion();
                }
            }
        }

        function doStand() {
            for(var uid in that.charaSpriteArray){
                that.charaSpriteArray[uid].doStandMotion();
            }
        }

        function invisibleDamage(){
            for (var uid in statusArray) {
                if (uid !== attackUserId) {
                    damageLabelArray[uid].visible = false;
                    break;
                }
            }
        }
    };
    
    function onCommand(fn) {
        emitCommand = fn;
    };
    
    function refreshMertor(statusArray){
        for(var uid in statusArray){
            hpMertorArray[uid].setValue(statusArray[uid].hp);
            batteryMertorArray[uid].setValue(statusArray[uid].battery);
            activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    function moveBatteryCommand(){
        setAtackCommandVisible(false);
        viewBatteryCommand();
    };
    
    function viewBatteryCommand(){
        setBatteryCommandVisible(true);
        that.prevIcon.visible = userId===attackUserId ? true : false;
        batteryNumberArray[userId].visible = true;
        selectMaxBattery = getSelectMaxBattery();
        selectMinBattery = getSelectMinBattery();
        batteryNumberArray[userId].frame = batteryMertorArray[userId].getValue()>0 ? 1 : 0;
    }
    
    function getSelectMaxBattery(){
        return batteryMertorArray[userId].getValue();;
    }
    
    function getSelectMinBattery(){
        return userId===attackUserId ? 1 : 0;
    }
    
    function plusBattery(){
        var number = batteryNumberArray[userId].frame;
        if(number<selectMaxBattery){
            batteryNumberArray[userId].frame ++;    
        }
    };
    
    function minusBattery(){
        var number = batteryNumberArray[userId].frame;
        if(selectMinBattery<number){
            batteryNumberArray[userId].frame --;    
        }
    };
    
    function prevAtackCommand(){
        setAtackCommandVisible(true);
        setBatteryCommandVisible(false);
        batteryNumberArray[userId].visible = false;        
    };
    
    function charge(){
        setAtackCommandVisible(false);
        emitCommand({method:'charge'});
    };
    
    function selectBattery(){
        var battery = batteryNumberArray[userId].frame;
        setBatteryCommandVisible(false);
        batteryNumberArray[userId].visible = false;
        
        if(attackUserId===userId){
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