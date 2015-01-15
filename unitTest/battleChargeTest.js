describe('Battleクラス チャージ', function() {
    var assert = require('chai').assert;
    var battle = require('../battle.js');

    it('チャージしてバッテリーが全回復する',function(){
        var testData = {};
        testData[1] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            }
        };
        testData[2] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        };

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
        testData[1] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            }
        };
        testData[2] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        };

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
        testData[1] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            }
        };
        testData[2] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        };

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