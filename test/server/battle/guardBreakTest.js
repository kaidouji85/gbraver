describe('Battleクラス パイロットスキル ガードブレイク', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();


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
            atackBattery : 3,
            defenthBattery : 3
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(attackResult.damage,900,'600(通常ダメージ)+300(追加ダメージ)=900ダメージを受ける');
        assert.equal(attackResult.hit,1,'通常ヒット判定になる');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');

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
        var result = Battle.atack({
            atackBattery : 3,
            defenthBattery : 3
        });
        assert.equal(result.hit,3,'ガード判定になる');
        assert.equal(result.damage,300,'ダメージが半減する');
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
        var result = Battle.atack({
            atackBattery : 3,
            defenthBattery : 3
        });
        assert.equal(result.hit,3,'ガード判定になる');
        assert.equal(result.damage,300,'ダメージが半減する');
    });
});