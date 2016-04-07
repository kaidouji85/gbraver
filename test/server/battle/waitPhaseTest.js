describe('Battleクラス ウェイトフェイズ', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('素早いキャラクターのターンになる', function () {
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray: testData
        });

        var ret = Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        assert.equal(ret.atackUserId, '1', 'ユーザID1のターンになる');
        assert.isTrue(statusArray[1].active >= Battle.MAX_ACTIVE, "アクティブゲージが最大値以上になる");
    });

    it('素早さが同じ場合は、インデックスが若いキャラクターのターンになる', function () {
        var testData = {};
        var testData = {};
        testData[5] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('granBraver');

        var Battle = battle({
            statusArray: testData
        });

        var ret = Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        assert.equal(ret.atackUserId, '2', 'ユーザID2のターンになる');
        assert.isTrue(statusArray[5].active >= Battle.MAX_ACTIVE, "ユーザID5のアクティブゲージが最大値以上になる");
        assert.isTrue(statusArray[2].active >= Battle.MAX_ACTIVE, "ユーザID2のアクティブゲージが最大値以上になる");

    });

    it('自分のターンになったらバッテリーが1回復する', function () {
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[1].battery = 3;
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray: testData
        });

        var ret = Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        assert.equal(ret.atackUserId, '1', 'ユーザID1のターンになる');
        assert.equal(4, statusArray[1].battery, 'バッテリーが1回復する');
        assert.isTrue(statusArray[1].active >= Battle.MAX_ACTIVE, "アクティブゲージが最大値以上になる");
    });

    it('ウェイトフェイズのターン数を取得できる', function () {
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray: testData
        });

        var ret = Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        assert.equal(ret.turn, Math.round(Battle.MAX_ACTIVE / statusArray[1].speed), 'ターン経過数が取得できる');
    });
});