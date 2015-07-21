describe('Battleクラス アビリティ ハイパーシールド', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('シールドが残っているのでHPが減らない', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraver'),
                'test002@gmail.com' : battleUnitData.get('landozerHyperShield')
            }
        });

        //ウェイトフェイズ実施
        Battle.doWaitPhase();

        //攻撃を受ける
        var ret = Battle.atack({
            atackBattery: 3,
            defenthBattery: 1
        });

        assert.equal( ret.damage, 700 , 'ダメージが700である' );
        assert.equal( Battle.getStatusArray()['test002@gmail.com'].hp, 4700, 'HPが減らない');
        assert.equal( Battle.getStatusArray()['test002@gmail.com'].specialPoint, 300, '特殊ポイントが300である');
    });

    it('シールドを貫通してもHPは減らない', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraver'),
                'test002@gmail.com' : battleUnitData.get('landozerHyperShield')
            }
        });

        //ウェイトフェイズ実施
        Battle.doWaitPhase();

        //攻撃を受ける
        var ret = Battle.atack({
            atackBattery: 5,
            defenthBattery: 0
        });

        assert.equal( ret.damage, 4400 , 'ダメージが4400である' );
        assert.equal( Battle.getStatusArray()['test002@gmail.com'].hp, 4700, 'HPが減らない');
        assert.equal( Battle.getStatusArray()['test002@gmail.com'].specialPoint, -3400, '特殊ポイントが-3400である');
    });

    it('シールド破壊後はHPが減る', function () {
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraver'),
                'test002@gmail.com' : battleUnitData.get('landozerHyperShield')
            }
        });

        //ウェイトフェイズ
        Battle.doWaitPhase();

        //攻撃を受ける
        Battle.atack({
            atackBattery: 3,
            defenthBattery: 0
        });

        //ウェイトフェイズ
        Battle.doWaitPhase();

        //チャージ
        Battle.charge();

        //ウェイトフェイズ
        Battle.doWaitPhase();

        //攻撃を受ける
        Battle.atack({
            atackBattery: 3,
            defenthBattery: 0
        });

        assert.equal( Battle.getStatusArray()['test002@gmail.com'].hp, 3100, 'HPが減る');
    });

    it('特殊ポイントがシールド値になっている',function(){
        var Battle = battle({
            statusArray: {
                'test001@gmail.com' : battleUnitData.get('granBraver'),
                'test002@gmail.com' : battleUnitData.get('landozerHyperShield')
            }
        });

        assert.equal( Battle.getStatusArray()['test002@gmail.com'].specialPoint, 1000, '特殊ポイントがシールド値と同じ');
    });
});
