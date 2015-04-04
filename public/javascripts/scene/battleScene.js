//TODO : 自分が出したバッテリーが消えることがあった。原因不明。
//       バッテリーが消える場合でも、visibleはtrueに設定してあった。
//       frameも範囲外（０から5以外)が指定された訳でもない。
//       enchant.jsの不具合の可能性が高い。
function battleScene(spec,my){
    var that = battleSceneBase(spec,my);

    var core = enchant.Core.instance;
    var emitCommand = function(){};
    var emitPushBattleEndIcon = function(){};
    var selectMaxBattery = 5;
    var selectMinBattery = 0;
    var attackUserId = -1;
    var skillPoint = 1;
    var AttackAnime = attackAnime({
        battleScene : that
    });
    var MyTurnAnime = myTurnAnime({
        battleScene : that
    });
    var ExplosionAnime = explosionAnime({
        battleScene : that
    });
    var AbilityAnime = abilityAnime({
        battleScene : that
    });
    var SkillAnime = skillAnime({
        battleScene : that
    });

    var WAIT_TIME_ACTIVE_RESET = 30;
    var FRAME_STAND = 0;
    var FRAME_ATTACK = 1;
    var FRAME_DAMAGE = 2;

    that.doWaitPhase = doWaitPhase;
    that.doAtackCommandPhase = doAtackCommandPhase;
    that.doChargePhase = doChargePhase;
    that.doDefenthCommandPhase = doDefenthCommandPhase;
    that.doDamagePhase = doDamagePhase;
    that.doDissolveRoom = doDissolveRoom;
    that.onCommand = onCommand;
    that.onPushBattleEndIcon = onPushBattleEndIcon;
    that.doGameEnd = doGameEnd;
    that.doPilotSkill = doPilotSkill;
    that.doArmdozerAbility = doArmdozerAbility;
    that.refreshMertor = refreshMertor;
    that.atackIcon.addEventListener(Event.TOUCH_END,moveBatteryCommand);
    that.chargeIcon.addEventListener(Event.TOUCH_END,charge);
    that.skillIcon.addEventListener(Event.TOUCH_END,pilotSkill);
    that.plusIcon.addEventListener(Event.TOUCH_END,plusBattery);
    that.minusIcon.addEventListener(Event.TOUCH_END,minusBattery);
    that.okIcon.addEventListener(Event.TOUCH_END,selectBattery);
    that.prevIcon.addEventListener(Event.TOUCH_END,prevAtackCommand);
    that.battleEndIcon.addEventListener(Event.TOUCH_END,doBattleEnd);

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setBgm(core.assets[core.SOUND_BATTLE]);
    });
    
    function doWaitPhase(data){
        var turn = data.turn;
        var plusValue;
        that.mesWindow.setVisible(false);
        attackUserId = data.atackUserId;
        for(var uid in data.statusArray) {
            plusValue = (120*data.statusArray[uid].active/5000 - that.activeBarArray[uid].getValue())/turn;
            that.activeBarArray[uid].plus(turn,plusValue);
        }

        that.tl.delay(turn).then(function(){
            refreshMertor(data.statusArray);
            MyTurnAnime.play(data,function(){
                that.mesWindow.setVisible(true);
                if(attackUserId === that.userId) {
                    that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
                } else {
                    that.mesWindow.setText(core.MESSAGE_WAIT_COMMAND);
                }
                emitCommand({method:'ok'});
            });
        });
    }
    
    function doAtackCommandPhase(data){
        if(that.userId === attackUserId){
            that.mesWindow.setVisible(false);
            setAtackCommandVisible(true);
            if(data.statusArray[that.userId].overHeatFlag){
                that.chargeIcon.setPict(core.assets[core.PICT_OVERHEAT_BUTTON]);
            } else {
                that.chargeIcon.setPict(core.assets[core.PICT_BUTTON]);
            }
        } else {
            that.tl.delay(1).then(function(){
                that.mesWindow.setVisible(true);
                that.mesWindow.setText(core.MESSAGE_WAIT_COMMAND);
                emitCommand({method:'ok'});
            });
        }
    }
    
    function doChargePhase(data){
        refreshMertor(data.statusArray);
        that.mesWindow.setVisible(false);
        that.tl.delay(WAIT_TIME_ACTIVE_RESET).then(function(){
            that.charaSpriteArray[attackUserId].frame = FRAME_STAND;
            attackUserId = '';
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
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
            that.mesWindow.setVisible(false);
            viewBatteryCommand();
        }
    };
    
    function doDamagePhase(data){
        that.mesWindow.setVisible(false);
        data.attackUserId = attackUserId;
        AttackAnime.play(data,function(){
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            emitCommand({method:'ok'});
        });
    };

    function doPilotSkill(data){
        skillPoint = data.statusArray[that.userId].skillPoint;

        SkillAnime.play(attackUserId,data,function(){
            emitCommand({method:'ok'});
        });
    }
    
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
        var visible = that.userId===attackUserId ? true : false;
        that.prevIcon.setVisible(visible);
        that.batteryNumberArray[that.userId].visible = true;
        selectMaxBattery = getSelectMaxBattery();
        selectMinBattery = getSelectMinBattery();
        that.batteryNumberArray[that.userId].frame = that.batteryMertorArray[that.userId].getValue()>0 ? 1 : 0;
    }
    
    function getSelectMaxBattery(){
        return that.batteryMertorArray[that.userId].getValue();;
    }
    
    function getSelectMinBattery(){
        return that.userId===attackUserId ? 0 : 0;
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
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        emitCommand({method:'charge'});
    };

    function pilotSkill(){
        setAtackCommandVisible(false);
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        emitCommand({method:'pilotSkill'});
    }
    
    function selectBattery(){
        var battery = that.batteryNumberArray[that.userId].frame;
        setBatteryCommandVisible(false);
        that.batteryNumberArray[that.userId].visible = false;
        
        if(attackUserId===that.userId){
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMAND);
            sendAtackCommand(battery);
        } else {
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
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
        that.atackIcon.setVisible(visible);
        that.chargeIcon.setVisible(visible);
        if(skillPoint > 0 && visible===true){
            that.skillIcon.setVisible(true);
        } else {
            that.skillIcon.setVisible(false);
        }
    }
    
    function setBatteryCommandVisible(visible){
        that.plusIcon.setVisible(visible);
        that.minusIcon.setVisible(visible);
        that.okIcon.setVisible(visible);
        that.prevIcon.setVisible(visible);
    }

    function doGameEnd(data){
        ExplosionAnime.play(data,function(){
            emitCommand({method:'ok'});
        });
    }

    function onPushBattleEndIcon(fn) {
        emitPushBattleEndIcon = fn;
    }

    function doDissolveRoom(){
        that.mesWindow.setVisible(false);
        that.battleEndIcon.setVisible(true);
    }

    function doBattleEnd() {
        that.battleEndIcon.setVisible(false);
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
        emitPushBattleEndIcon();
    }

    function doArmdozerAbility(data) {
        AbilityAnime.play(data,function(){
            emitCommand({method:'ok'});
        })
    }

    return that;
}