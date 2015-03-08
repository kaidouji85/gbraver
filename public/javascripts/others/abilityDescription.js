function getArmdozerAbilityDescription(ability){
    var ret = 'アームドーザアビリティ';
    if(ability.type==='boostBattery'){
        ret = 'バッテリーが'+ability.battery+'回復';
    }
    return ret;
}