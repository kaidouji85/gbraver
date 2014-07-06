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
                var battery = battleScene.batteryMertorArray[uid].getValue();
                battery -= uid===attackUserId ? atackBattery : defenthBattery;
                battleScene.batteryMertorArray[uid].setValue(battery);
                battleScene.batteryNumberArray[uid].frame = uid===attackUserId ? atackBattery : defenthBattery;
                battleScene.batteryNumberArray[uid].visible = true;
                battleScene.charaSpriteArray[uid].frame = uid===attackUserId ? core.FRAME_ATTACK : core.FRAME_STAND;
            }
        }).delay(120).then(function(){
            for(var uid in battleScene.statusArray){
                battleScene.batteryNumberArray[uid].visible = false;
                if(uid===attackUserId){
                    battleScene.charaSpriteArray[uid].doAttackMotion();
                } else {
                    battleScene.charaSpriteArray[uid].doHitMotion();
                }
            }
        }).delay(30).then(function(){
            for (var uid in battleScene.statusArray) {
                if (uid !== attackUserId) {
                    battleScene.damageLabelArray[uid].visible = true;
                    battleScene.damageLabelArray[uid].text = String(damage);
                    battleScene.hpMertorArray[uid].setValue(damagedStatusArray[uid].hp);
                    break;
                }
            }
        }).delay(120).then(function(){
            battleScene.refreshMertor(damagedStatusArray);
            for (var uid in battleScene.statusArray) {
                battleScene.charaSpriteArray[uid].doStandMotion();
                if (uid !== attackUserId) {
                    battleScene.damageLabelArray[uid].visible = false;
                }
            }
            fn();
        });
    }

    return that;
}