describe('Battleクラス パイロットスキル スーパーガード', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('スーパーガードを使いダメージが50%になる',function(){
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

        assert.equal(retAttack.damage,350,'ダメージが50%になる');
        assert.equal(retStatus['test001@gmail.com'].skillPoint,0,'パイロットスキルポイントが0になる');
    });

    it('2回目以降はダメージが通常に戻る',function(){
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

        //グランブレイバーがチャージする
        Battle.doWaitPhase();
        Battle.charge();

        //ランドーザがグランブレイバーを攻撃
        Battle.doWaitPhase();
        var retAttack = Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });
        var retStatus = Battle.getStatusArray();

        assert.equal(retAttack.damage,700,'ダメージが100%である');
    });


    it('攻撃を回避した場合は、ダメージ50%効果が次ターンに残る',function(){
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
            defenthBattery : 3
        });

        //グランブレイバーがチャージする
        Battle.doWaitPhase();
        Battle.charge();

        //ランドーザがグランブレイバーを攻撃
        Battle.doWaitPhase();
        var retAttack = Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });
        var retStatus = Battle.getStatusArray();

        assert.equal(retAttack.damage,350,'ダメージが50%である');
    });
});