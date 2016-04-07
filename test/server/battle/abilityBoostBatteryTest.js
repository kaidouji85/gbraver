describe('Battleクラス アビリティ ブーストバッテリー', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('HPが30%以下なのでブーストバッテリーが発動する', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraverBoostBattery'),
                'test002@gmail.com' : battleUnitData.get('landozer')
            }
        });
        Battle.getStatusArray()['test001@gmail.com'].hp = 100;      //HPを30%以下にする
        Battle.getStatusArray()['test001@gmail.com'].battery = 0    //バッテリーを0にする

        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: true,
            playerId: 'test001@gmail.com'
        };
        assert.deepEqual(ret,expect,'test001@gmail.comのアビリティが発動する');
        assert.equal(Battle.getStatusArray()['test001@gmail.com'].battery,5,'バッテリーが5回復する');
    });

    it('アームドーザアビリティは1回しか発動しない', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraverBoostBattery'),
                'test002@gmail.com' : battleUnitData.get('landozer')
            }
        });
        Battle.getStatusArray()['test001@gmail.com'].hp = 100;  //HPを30%以下にする

        Battle.doArmdozerAbility();
        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: false,
            playerId: ''
        };
        assert.deepEqual(ret,expect,'2回目以降はアビリティが発動しない');
    });
});