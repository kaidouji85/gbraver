describe('Battleクラス チャージ', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('チャージしてバッテリーが全回復する',function(){
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        Battle.doWaitPhase();
        Battle.charge();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray[1].battery,5,'バッテリーが回復している');
    });

    it('チャージしてアクティブゲージが0になる',function(){
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        Battle.doWaitPhase();
        Battle.charge();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray[1].active,0,'アクティブゲージが0になる');
    });

    it('2回連続でチャージするとアクティブゲージが1ターン分マイナスになる',function(){
        var testData = {};
        testData[1] = battleUnitData.get('granBraverSpeed1000');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        Battle.doWaitPhase();
        Battle.charge();
        Battle.doWaitPhase();
        Battle.charge();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray[1].active,-Battle.MAX_ACTIVE,'アクティブゲージが1ターン分マイナスになる');
        assert.equal(statusArray[1].overHeatFlag,true,'オーバヒートフラグがtrueになる');
    });
});