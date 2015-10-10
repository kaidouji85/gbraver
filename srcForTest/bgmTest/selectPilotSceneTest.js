var testData = require('../testlib/testData');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectPilotScene({
            selectPilotId : 'akane',
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.replaceScene(testScene);
        assertOfBgm();
    };

    function assertOfBgm() {
        assert.equal(Game.bgm.getBgm(),null,'BGなしに設定されている');
        finishTest();
    }
}