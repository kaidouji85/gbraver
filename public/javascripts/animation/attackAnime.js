function attackAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;
    var core = enchant.Core.instance;

    that.play = function(data,fn){
        var damagedStatusArray = data.statusArray;
        var attackUserId = data.attackUserId;
        var hit = data.hit;
        var damage = data.damage;
        var atackBattery = data.atackBattery;
        var defenthBattery = data.defenthBattery;

        battleScene.tl.then(function(){
            for(var uid in battleScene.statusArray){
                var battery = battleScene.merter.batteryMerterArray[uid].getValue();
                battery -= uid===attackUserId ? atackBattery : defenthBattery;
                battleScene.merter.batteryMerterArray[uid].setValue(battery);
                battleScene.batteryNumberArray[uid].frame = uid===attackUserId ? atackBattery : defenthBattery;
                battleScene.batteryNumberArray[uid].visible = true;
                battleScene.batteryNumberArray[uid].playOpenBatteryAnime();
                battleScene.charaSpriteArray[uid].frame = uid===attackUserId ? core.FRAME_ATTACK : core.FRAME_STAND;
                core.assets[core.SOUND_OPEN_BATTERY].play();
            }
        }).delay(120).then(function(){
            for(var uid in battleScene.statusArray){
                battleScene.batteryNumberArray[uid].visible = false;
                if(uid===attackUserId){
                    battleScene.charaSpriteArray[uid].doAttackMotion();
                } else {
                    if( hit===core.ATACK_MISS){
                        battleScene.charaSpriteArray[uid].doAvoidMotion();
                    } else {
                        battleScene.charaSpriteArray[uid].doHitMotion();
                        battleScene.hitEffectArray[uid].play();
                    }
                }
            }
        }).delay(30).then(function(){
            for (var uid in battleScene.statusArray) {
                if (uid !== attackUserId) {
                    battleScene.damageLabelArray[uid].visible = true;
                    battleScene.damageLabelArray[uid].setVisible(true);
                    battleScene.damageLabelArray[uid].setDamage(damage);
                    if(hit!==core.ATACK_HIT){
                        battleScene.subDamageLabelArray[uid].visible = true;
                        if(hit === core.ATACK_MISS){
                            battleScene.subDamageLabelArray[uid].frame = 0;
                        } else if(hit === core.ATACK_GUARD){
                            battleScene.subDamageLabelArray[uid].frame = 1;
                        } else{
                            battleScene.subDamageLabelArray[uid].frame = 2;
                        }
                    }
                    battleScene.merter.setHp(uid,damagedStatusArray[uid].hp);
                    battleScene.merter.specialMerterArray[uid].setValue(damagedStatusArray[uid].specialPoint);
                    break;
                }
            }
        }).delay(120).then(function(){
            battleScene.refreshMertor(damagedStatusArray);
            for (var uid in battleScene.statusArray) {
                if(damagedStatusArray[uid].hp>0){
                    battleScene.charaSpriteArray[uid].doStandMotion();
                }

                // 防御側だけ実施する処理
                if (uid !== attackUserId) {
                    battleScene.damageLabelArray[uid].setVisible(false);
                    battleScene.subDamageLabelArray[uid].visible = false;

                    //シールドブレイク判定
                    if(battleScene.statusArray[uid].ability.type==='hyperShield' && data.statusArray[uid].specialPoint<=0){
                        var breakPictName = battleScene.statusArray[uid].ability.breakedPict;
                        battleScene.charaSpriteArray[uid].image = core.assets[core.PICT_PREFIX+breakPictName];
                    }
                }
            }
        }).delay(10).then(function(){
            fn();
        });
    }

    return that;
}