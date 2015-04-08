function getArmdozerAbilityDescription(ability){
    var ret = 'アームドーザアビリティ';
    switch(ability.type){
        case 'boostBattery':
            ret = 'バッテリーが'+ability.battery+'回復';
            break;
        case 'boostActive':
            ret = 'アクティブゲージが' + ability.active*100 +'%増加する';
            break;
        case 'boostPower':
            ret = '攻撃が'+ability.power+'増加する';
            break;
    }
    return ret;
}