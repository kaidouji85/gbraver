describe('Battleクラス アビリティ ブーストアクティブ', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('HPが30%以下なのでブーストパワーが発動する', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraverBoostPower'),
                'test002@gmail.com' : battleUnitData.get('landozer')
            }
        });
        Battle.getStatusArray()['test001@gmail.com'].hp = 100;  //HPを30%以下にする

        //HPが30%以下なのでブーストバッテリーが発動する
        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: true,
            playerId: 'test001@gmail.com'
        };
        assert.deepEqual(ret,expect,'test001@gmail.comのアビリティが発動する');

        //攻撃力が上がる
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].weapons[1].power,900,'攻撃力が100上がる');
        assert.equal(statusArray['test001@gmail.com'].weapons[2].power,1200,'攻撃力が100上がる');
        assert.equal(statusArray['test001@gmail.com'].weapons[3].power,1700,'攻撃力が100上がる');
        assert.equal(statusArray['test001@gmail.com'].weapons[4].power,2200,'攻撃力が100上がる');
        assert.equal(statusArray['test001@gmail.com'].weapons[5].power,2900,'攻撃力が100上がる');
    });

    it('アームドーザアビリティは1回しか発動しない',function(){

        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraverBoostActive'),
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