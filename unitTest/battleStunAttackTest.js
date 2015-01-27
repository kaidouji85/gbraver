describe('Battleクラス パイロットスキル スタン攻撃', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');
    var battleUnitData = require('./battleUnitData.js')();

    it('スタンスキルを使い、攻撃ヒット時にアクティブゲージが-5000になる',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverStunAttack');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3600,'test002@gmail.comが1100ダメージを受ける');
        assert.equal(statusArray['test002@gmail.com'].active,-2500,'test002@gmail.comのアクティブゲージが-2500になる');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('防御されたのでスタンスキルは無効',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverStunAttack');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,4300,'test002@gmail.comが400ダメージを受ける');
        assert.equal(statusArray['test002@gmail.com'].active,3300,'test002@gmail.comのアクティブゲージが減らない');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('回避されたのでスタンスキルは無効',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverStunAttack');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 3
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,4700,'test002@gmail.comがダメージを受けない');
        assert.equal(statusArray['test002@gmail.com'].active,3300,'test002@gmail.comのアクティブゲージが減らない');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('2回目攻撃以降はスタン攻撃スキルは無効(1回目に攻撃ミス)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverStunAttack');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 2
        });

        //もう一度グランブレイバーが攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].active,1500,'test002@gmail.comのアクティブゲージが減らない');
    });

    it('2回目攻撃以降はスタン攻撃スキルは無効(1回目に攻撃ヒット)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverStunAttack');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        //もう一度グランブレイバーが攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].active,-1750,'test002@gmail.comのアクティブゲージが減らない');
    });
});