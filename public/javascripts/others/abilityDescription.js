function getArmdozerAbilityDescription(ability){
    var ret = 'アームドーザアビリティ';
    if(ability.type==='boostBattery'){
        ret = 'バッテリーが'+ability.battery+'回復';
    } else if (ability.type==='boostActive') {
        ret = 'アクティブゲージが' + ability.active*100 +'%増加する';
    }
    return ret;
}