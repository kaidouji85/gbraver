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
                switch(hit){
                    case core.ATACK_HIT:
                        uid===attackUserId ?
                            battleScene.charaSpriteArray[uid].doAttackMotion() : battleScene.charaSpriteArray[uid].doHitMotion();
                        break;
                    case core.ATACK_GUARD:
                        uid===attackUserId ?
                            battleScene.charaSpriteArray[uid].doAttackMotion() : battleScene.charaSpriteArray[uid].doHitMotion();
                        break;
                    case core.ATACK_CRITICAL:
                        uid===attackUserId ?
                            battleScene.charaSpriteArray[uid].doAttackMotion() : battleScene.charaSpriteArray[uid].doHitMotion();
                        break;
                    case core.ATACK_MISS:
                        uid===attackUserId ?
                            battleScene.charaSpriteArray[uid].doAttackMotion() : battleScene.charaSpriteArray[uid].doAvoidMotion();
                        break;
                }
            }
        }).delay(30).then(function(){
            for (var uid in battleScene.statusArray) {
                if (uid !== attackUserId) {
                    battleScene.damageLabelArray[uid].visible = true;
                    battleScene.damageLabelArray[uid].text = getDamageText(damage,hit);
                    battleScene.subDamageLabelArray[uid].visible = true;
                    battleScene.subDamageLabelArray[uid].text = getSubDamageText(hit);
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
                    battleScene.subDamageLabelArray[uid].visible = false;
                }
            }
        }).delay(10).then(function(){
            fn();
        });
    }

    function getDamageText(damage,hit){
        var text = String(damage);
        if(hit===core.ATACK_MISS){
            text = '';
        }
        return text;
    }

    function getSubDamageText(hit) {
        var text = '';
        switch(hit){
            case core.ATACK_HIT:
                break;
            case core.ATACK_MISS:
                text = 'MISS';
                break;
            case core.ATACK_GUARD:
                text = 'GUARD';
                break;
            case core.ATACK_CRITICAL:
                text = 'CRITICAL';
                break;
        }
        return text;
    }

    return that;
}