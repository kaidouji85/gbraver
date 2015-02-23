describe('Battleクラス パイロットスキル スタン攻撃', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('スタンスキルを使い、攻撃ヒット時にアクティブゲージが-5000になる',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverSuperGuard');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスーパーガード発動後、チャージする
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.charge();

        //ランドーザがグランブレイバーを攻撃
        Battle.doWaitPhase();
        var retAttack = Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });
        var retStatus = Battle.getStatusArray();

        assert.equal(retAttack.damage,1200,'ダメージが50%になる');
        assert.equal(retStatus['test001@gmail.com'].skillPoint,0,'パイロットスキルポイントが0になる');
    });
});