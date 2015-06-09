enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData().getData('nextStoryTest');

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario
        });
        Game.replaceScene(testScene);
        pushNextButton();
    };

    function pushNextButton(){
        Game.currentScene.onChangeNextStory(assertOfStory);
        touch(Game.currentScene);
    }

    function assertOfStory(nextStoryId) {
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスが正しい');
        assert.equal(nextStoryId,testScenario[1].param,'ステージクリア後に遷移するストーリーIDが正しい');
        finishTest();
    }
}