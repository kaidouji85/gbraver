var testData = require('../testlib/testData');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var testScenario = testScenarioData().getMasterData();
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData(),
            scenarioData : testScenario
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushStoryButton();
        };
    }

    function pushStoryButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.currentScene.storyButton);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'storyScene','ストーリーモードに遷移する');
        assert.equal(Game.getScenarioId(),'kyokoStart','シナリオIDが パイロット名+Start となっている ');
        finishTest();
    }
}