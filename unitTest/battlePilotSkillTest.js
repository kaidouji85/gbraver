describe('Battleクラス パイロットスキル', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');
    var battleUnitData = require('./battleUnitData.js')();

    it('クイックチャージでバッテリーを回復する',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverQuickCharge');
        testData['test001@gmail.com'].battery = 0;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });
        Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
        Battle.doPilotSkill();
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].battery,4,'test001@gmail.comのHPが3回復する。');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
    });

    it('クイックチャージでもバッテリー上限を超えて回復しない',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverQuickCharge');
        testData['test001@gmail.com'].battery = 2;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });
        Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
        Battle.doPilotSkill();
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].battery,5,'test001@gmail.comのHPが5以上にはならない。');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
    });

    it('HP回復スキルで最大HPの50%分回復する',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraver');
        testData['test002@gmail.com'] = battleUnitData.get('landozerRecoverHp');
        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーが2800ダメージを与える
        Battle.doWaitPhase();
        Battle.getStatusArray();
        Battle.atack({
            atackBattery : 5,
            defenthBattery : 1
        });

        //ランドーザがスキルを使いHPを回復
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.getStatusArray();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,2450,'test002@gmail.comのHPが1750回復する。');
        assert.equal(statusArray['test002@gmail.com'].skillPoint,0,'test002@gmail.comのスキルポイントが-1される。');
    });

    it('HP回復スキルでは最大HP以上は回復しない',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraver');
        testData['test002@gmail.com'] = battleUnitData.get('landozerRecoverHp');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーが1100ダメージを与える
        Battle.doWaitPhase();
        Battle.getStatusArray();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        //ランドーザがスキルを使いHPを回復
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.getStatusArray();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3500,'test002@gmail.comは最大HPまでしか回復しない。');
        assert.equal(statusArray['test002@gmail.com'].skillPoint,0,'test002@gmail.comのスキルポイントが-1される。');
    });

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

    it('ガードブレイクスキルによりガードが無効になり追加ダメージが入る',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        var attackResult = Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3600,'test002@gmail.comが800+300=1100ダメージを受ける');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(attackResult.hit,1,'通常ヒット判定になる');
    });

    it('ガードブレイクスキルにより追加ダメージが入る',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        var attackResult = Battle.atack({
            atackBattery : 3,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,2800,'test002@gmail.comが1600+300=1900ダメージを受ける');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ヒット)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        //ランドーザが1100ダメージを受ける
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        //グランブレイバー2回目の攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3200,'test002@gmail.comが400ダメージを受ける');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ミス)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 2
        });

        //グランブレイバー2回目の攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,4300,'test002@gmail.comが400ダメージを受ける');
    });
}); 