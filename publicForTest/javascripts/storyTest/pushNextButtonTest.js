enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenarioData
        });
        Game.replaceScene(testScene);
        pushNextButton();
    };

    function pushNextButton(){
        Game.currentScene.onProceedStory(assertOfStory);
        touch(Game.currentScene);

    }

    function assertOfStory(index, scenario) {
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスが次に進む');
        finishTest();
    }
}