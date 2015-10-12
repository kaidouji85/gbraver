var testData = require('../testlib/testData');
var basicMerter = require('../../src/meter/basicMerter');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testMerter = null;
    var testGame = gameBase();
    var testDataInst = testData();

    testGame.start();
    testGame.onload = viewBasicMerter;

    function viewBasicMerter() {
        testMerter = basicMerter({
            userId : 'test001@gmail.com',
            statusArray : {
                'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
                'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
            }
        });
        testGame.currentScene.addChild(testMerter);
        assertOfMerter();
    }

    function assertOfMerter(){
        assert.equal(testMerter.maxHpArray['test001@gmail.com'],3200,'最大HPが正しい');
        assert.equal(testMerter.hpNumberArray['test001@gmail.com'].getValue(),3200,'Hが正しい');
        assert.equal(testMerter.maxHpArray['test002@gmail.com'],4700,'最大HPが正しい');
        assert.equal(testMerter.hpNumberArray['test002@gmail.com'].getValue(),4700,'Hが正しい');
        testUtil.finishTest();
    }
}