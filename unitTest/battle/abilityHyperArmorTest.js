describe('Battleクラス アビリティ ハイパーアーマ', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('防御したのでダメージが0%になる', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraver'),
                'test002@gmail.com' : battleUnitData.get('landozerHyperArmor')
            }
        });

        //ウェイトフェイズ実施
        Battle.doWaitPhase();

        //攻撃を防御する
        var ret = Battle.atack({
            atackBattery: 3,
            defenthBattery: 3
        });
        assert.equal( ret.hit, Battle.ATACK_GUARD, '防御判定である' );
        assert.equal( ret.damage, 0 , 'ダメージが0である' );

        //アームドーザアビリティ発動
        var ret = Battle.doArmdozerAbility();
        var expect = {
            isEffective: true,
            playerId: 'test002@gmail.com'
        };
        assert.deepEqual(ret,expect,'test002@gmail.comのアビリティが発動する');
    });
});
