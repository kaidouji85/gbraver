function getArmdozerAbilityDescription(ability){
    var ret = 'アームドーザアビリティ';
    if(ability.type==='boostBattery'){
        ret = 'バッテリーを'+ability.battery+'回復する';
    }
    return ret;
}