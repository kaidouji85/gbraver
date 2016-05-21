module.exports = {
    getSkillDescription: function(pilotData){
        switch(pilotData.type){
            case 'quickCharge' :
                return `バッテリーを${pilotData.battery}回復する`;
            case 'recoverHp':
                return `HPを${pilotData.value*100}%回復する`;
            case 'guardBreak':
                return `攻撃力+${pilotData.value}、さらにガードを無効にする`;
            case 'superGuard' :
                return `1回だけ被ダメージを${pilotData.value*100}%にする`;
            default :
                return '不明スキル';
        }
    }
};