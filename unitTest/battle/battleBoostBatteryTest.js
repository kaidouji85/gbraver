describe('Battleクラス アビリティ ブーストバッテリー', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('HPが30%以下なのでブーストバッテリーが発動する', function () {
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverBoostBattery');
        testData['test001@gmail.com'].battery = 1;//バッテリーを1にする
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray: testData
        });

        //グランブレイバーがフェイント攻撃する
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery: 0,
            defenthBattery: 0
        });

        //ランドーザが攻撃する
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery: 2,
            defenthBattery: 1
        });

        //HPが30%以下なのでブーストバッテリーが発動する
        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: true,
            playerId: 'test001@gmail.com'
        };
        assert.deepEqual(ret,expect,'test001@gmail.comのアビリティが発動する');

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].battery,5,'バッテリーが5回復する');
    });

    it('アームドーザアビリティは1回しか発動しない', function () {
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverBoostBattery');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray: testData
        });

        //グランブレイバーがチャージする
        Battle.doWaitPhase();
        Battle.charge();

        //ランドーザが攻撃する
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery: 2,
            defenthBattery: 1
        });

        //HPが30%以下なのでブーストバッテリーが発動する
        Battle.doArmdozerAbility();

        //HPが30%以下でもアームドーザスキルは1回しか発動しない
        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: false,
            playerId: ''
        };
        assert.deepEqual(ret,expect,'2回目以降はアビリティが発動しない');
    });
});