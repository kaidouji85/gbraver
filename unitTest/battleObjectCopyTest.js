describe('Battleクラス オブジェクトコピー', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');

    it('オブジェクトがコピーされている',function(){
        var testData = {};
        testData[1] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 5,
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
        var statusArray = Battle.getStatusArray();
        var expect = {
            1:{
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                defense : 0,
                speed : 230,
                active : 0,
                battery : 5,
                overHeatFlag : false,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            },
            2:{
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
            }
        };
        assert.deepEqual(testData,expect,'ステータスがコピーされている');
    });
});