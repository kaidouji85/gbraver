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
        assertOfBgm();
    };

    function assertOfBgm(){
        assert.equal(Game.bgm.getBgm(),null,'BGなしに設定されている');
        finishTest();
    }
}