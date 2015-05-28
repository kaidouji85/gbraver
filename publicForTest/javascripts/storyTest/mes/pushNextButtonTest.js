enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData().getData('mesTest');

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario
        });
        Game.replaceScene(testScene);
        pushNextButton();
    };

    function pushNextButton(){
        Game.currentScene.onProceedStory(assertOfStory);
        touch(Game.currentScene);

    }

    function assertOfStory() {
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスがそのまま');
        assert.equal(Game.currentScene.mesWindow.getText(),testScenario[1].param,'セリフが正しい');
        finishTest();
    }
}