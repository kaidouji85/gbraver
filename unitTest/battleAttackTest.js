describe('Battleクラス 攻撃', function() {
    var assert = require('chai').assert;
    var battle = require('../battle.js');

    it('攻撃側のバッテリーが多いので攻撃がヒットする', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        var retWaitPhase = Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 2,
            defenthBattery: 1
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_HIT, '攻撃ヒット判定になる');
        assert.equal(retAtack.damage, 1100, 'ダメージが通常通りになる');
        assert.equal(statusArray[2].hp, 3600, 'HPが減っている');
    });

    it('攻撃・防御側が同じバッテリーを出したので防御判定になりダメージが半減される', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        var retWaitPhase = Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 4,
            defenthBattery: 4
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_GUARD, '防御判定になる');
        assert.equal(retAtack.damage, 2100 / 2, 'ダメージが半減される');
        assert.equal(statusArray[2].hp, 3650, 'HPが減っている');
    });

    it('防御側が多くバッテリーを出したので攻撃ミスになりダメージが0になる', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        var retWaitPhase = Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 2,
            defenthBattery: 4
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_MISS, '攻撃ミスになる');
        assert.equal(retAtack.damage, 0, 'ダメージが0になる');
        assert.equal(statusArray[2].hp, 4700, 'HPが減っていない');
    });

    it('防御側がバッテリーに0を指定したので、クリティカルヒットになる', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        var retWaitPhase = Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 1,
            defenthBattery: 0
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_CRITICAL, 'クリィカルヒットになる');
        assert.equal(retAtack.damage, 800 * 2, 'ダメージが2倍になる');
        assert.equal(statusArray[2].hp, 3100, 'HPが減っている');
    });

    it('攻撃後にアクティブゲージが0になっている', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        var retWaitPhase = Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 3,
            defenthBattery: 1
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray[1].active, 0, 'アクティブゲージが0になる');
    });

    it('攻撃後に攻撃側、防御側のバッテリーが減っている', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 3,
            defenthBattery: 1
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray[1].battery, 2, '攻撃側バッテリーが減る');
        assert.equal(statusArray[2].battery, 4, '防御側バッテリーが減る');
    });

    it('攻撃側が相手よりも2多くバッテリーを出したのでダメージボーナスがある', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 3,
            defenthBattery: 1
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_HIT, '攻撃ヒット判定になる');
        assert.equal(retAtack.damage, 1700, 'ダメージに+100ボーナスが入る');
        assert.equal(statusArray[2].hp, 3000, 'HPが減っている');
    });

    it('0で攻撃したので攻撃は絶対にミスする', function () {
        var testData = {};
        testData[1] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
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

        Battle.doWaitPhase();
        var retAtack = Battle.atack({
            atackBattery: 0,
            defenthBattery: 0
        });
        var statusArray = Battle.getStatusArray();
        assert.equal(retAtack.hit, Battle.ATACK_MISS, '攻撃ミス判定になる');
        assert.equal(retAtack.damage, 0, 'ダメージが0である');
        assert.equal(statusArray[2].hp, 4700, 'HPに変化がない');
    });
});