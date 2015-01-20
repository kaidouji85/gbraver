describe('Battleクラス getStatusArray()', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');

    it('ユーザIDを指定して、任意のキャラクターステータスを取り出す',function(){
        var testData = {};
        testData[8] = {
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
        testData[12] = {
            name : 'ゼロブレイバー',
            pictName : 'ZeroBraver.PNG',
            hp : 4200,
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

        var Battle = battle({
            statusArray : testData
        });
        var ret = Battle.getStatusArray();
        assert.deepEqual(testData[12],ret[12],'ユーザID12のステータスが取得できる');
    });
});