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
            selectPilotId : 'iori',
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.replaceScene(testScene);
        pushPrevButton();
    };

    function pushPrevButton(){
        testScene.onPushPrevButton(assertOfPushPrevButton)
        touch(testScene.prevButton);
    }

    function assertOfPushPrevButton(){
        finishTest();
    }
}