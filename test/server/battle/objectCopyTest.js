describe('Battleクラス オブジェクトコピー', function() {
    var assert = require('chai').assert;
    var battle = require('../../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('オブジェクトがコピーされている',function(){
        var testData = {};
        testData[1] = battleUnitData.get('granBraver');
        testData[2] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        Battle.doWaitPhase();
        var statusArray = Battle.getStatusArray();
        statusArray[1].hp = -1000;
        assert.deepEqual(testData[1].hp,3200,'オブジェクトがコピーされているので、コピー元オブジェクトのhpに変化がない');
    });
});