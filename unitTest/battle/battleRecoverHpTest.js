describe('Battleクラス パイロットスキル HP回復', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

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
            atackBattery : 3,
            defenthBattery : 1
        });

        //ランドーザがスキルを使いHPを回復
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.getStatusArray();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3410,'test002@gmail.comのHPが1750回復する。');
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
});