describe('Battleクラス getStatusArray()', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');
    var battleUnitData = require('./battleUnitData.js')();

    it('ユーザIDを指定して、任意のキャラクターステータスを取り出す',function(){
        var testData = {};
        testData[8] = battleUnitData.get('granBraver');
        testData[12] = battleUnitData.get('zeroBraver');

        var Battle = battle({
            statusArray : testData
        });
        var ret = Battle.getStatusArray();
        assert.deepEqual(testData[12],ret[12],'ユーザID12のステータスが取得できる');
    });
});