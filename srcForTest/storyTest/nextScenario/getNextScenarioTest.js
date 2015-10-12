var testData = require('../../testlib/testData');
var testUtil = require('../../testlib/testUtil');
var testScenarioData = require('../../testlib/testScenarioData');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var testScenario = testScenarioData().getMasterData();
    var Game = game({
        userId : 'test002@gmail.com',
        armdozerId : 'landozer',
        pilotId : 'kyoko',
        armdozerList : testDataInst.getMasterData().armdozerList,
        pilotList : testDataInst.getMasterData().pilotList,
        stageData : testDataInst.getStageData(),
        scenarioData : testScenario
    });

    Game.start();
    Game.onload = initTest;

    function initTest(){
        Game.changeStoryScene('nextScenarioTest');
        pushNextButton();
    }

    function pushNextButton(){
        Game.currentScene.onProceedStory(assertOfStory);
        testUtil.touch(Game.currentScene);
    }

    function assertOfStory() {
        assert.equal(Game.getNextScenarioId(),'nextScenarioId','次のストーリーIDが正しく設定されている');
        testUtil.finishTest();
    }
}