function getSkillDescription(pilotData){
    var ret = "";
    switch(pilotData.type){
        case 'quickCharge' :
            ret = 'バッテリーを'+pilotData.battery+'回復する';
            break;
        case 'recoverHp':
            ret = 'HPを'+pilotData.value*100+'%回復する'
            break;
        case 'guardBreak':
            ret = '攻撃力+'+pilotData.value+'、さらにガードを無効にする';
            break;
        default :
            ret = '不明スキル';
            break;
    }
    return ret;
}