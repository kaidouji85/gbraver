describe('Battleクラス アビリティ ブーストアクティブ', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('HPが30%以下なのでブーストアクティブが発動する', function () {
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverBoostActive');
        testData['test001@gmail.com'].active = 0;//アクティブゲージを0にする
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
            atackBattery: 3,
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
        assert.equal(statusArray['test001@gmail.com'].active,2760+1500,'アクティブゲージが1500回復する');
    });
});