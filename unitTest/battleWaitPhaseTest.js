describe('Battleクラス ウェイトフェイズ', function() {
    var assert = require('chai').assert;
    var battle = require('../battle.js');

    it('素早いキャラクターのターンになる', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 5,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            }
        };
        testData[2] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 150,
            active: 0,
            battery: 5,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        };

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
        testData[5] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 5,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            }
        };
        testData[2] = {
            name: 'ゼロブレイバー',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 5,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        };

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
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 3,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            }
        };
        testData[2] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 150,
            active: 0,
            battery: 2,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        };

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
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 3,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            }
        };
        testData[2] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 150,
            active: 0,
            battery: 2,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        };

        var Battle = battle({
            statusArray: testData
        });

        var ret = Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        assert.equal(ret.turn, Math.round(Battle.MAX_ACTIVE / statusArray[1].speed), 'ターン経過数が取得できる');
    });
});