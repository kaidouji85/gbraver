var testData = require('../testlib/testData');
var specialMerter = require('../../../../client/meter/specialMerter');
var testUtil = require('../testlib/testUtil');
var gameBase = require('../../../../client/game/gameBase');

enchant();
window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testMerter = null;
    var testGame = gameBase();
    var testDataInst = testData();

    testGame.start();
    testGame.onload = viewSpecialMerter;

    function viewSpecialMerter() {
        testMerter = specialMerter({
            isPlayer : false,
            ability : {
                type : 'hyperShield',
                value : 1000
            }
        });
        testMerter.x = 320;
        testGame.currentScene.addChild(testMerter);
        assertOfMerter();
    }

    function assertOfMerter(){
        testUtil.finishTest();
    }
}