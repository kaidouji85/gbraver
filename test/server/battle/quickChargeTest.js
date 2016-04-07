describe('Battleクラス パイロットスキル クイックチャージ', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

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
});