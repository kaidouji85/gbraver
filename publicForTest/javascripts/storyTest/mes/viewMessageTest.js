enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData()['mesTest'];

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario
        });
        Game.replaceScene(testScene);
        assertOfViewMessage();
    };

    function assertOfViewMessage() {
        assert.equal(Game.currentScene.getStoryIndex(),0,'ストーリーインデックスがそのまま');
        assert.equal(Game.currentScene.mesWindow.getText(),testScenario[0].param,'表示されるセリフが正しい');
        finishTest();
    }
}