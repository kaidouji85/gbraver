var testData = require('../testlib/testData');
var selectStageScene = require('../../src/scene/selectStageScene');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectStageScene({
            stageData : testDataInst.getStageData(),
            armdozerList : testDataInst.getArmdozerData()
        });
        Game.replaceScene(testScene);
        pushPrevButton();
    }

    function pushPrevButton(){
        testScene.onPushPrevButton(assertOfPushPrevButton);
        testUtil.touch(testScene.prevButton);
    }

    function assertOfPushPrevButton(){
        testUtil.finishTest();
    }
}