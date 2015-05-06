function getArmdozerAbilityDescription(ability){
    var ret = 'アームドーザアビリティ';
    switch(ability.type){
        case 'boostBattery':
            ret = 'バッテリーが'+ability.battery+'回復';
            break;
        case 'boostActive':
            ret = 'アクティブゲージが' + ability.active*100 +'%増加';
            break;
        case 'boostPower':
            ret = '攻撃が'+ability.power+'増加';
            break;
        case 'hyperArmor' :
            ret = '防御したらダメージが'+ability.value*100+'%';
            break;
    }
    return ret;
}

function getArmdozerAbilityTrigger(ability) {
    var ret = 'アビリティ発動条件';
    switch(ability.type){
        case 'boostBattery':
        case 'boostActive':
        case 'boostPower':
            ret = 'HPが'+ability.threshold*100+'%以下(1回のみ)';
            break;
        case 'hyperArmor':
            ret = '常時'
            break;
    }
    return ret;
}