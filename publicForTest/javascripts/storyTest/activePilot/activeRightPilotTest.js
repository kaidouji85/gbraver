enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData()['activeRightPilotTest'];
    var pilotList = testData().getMasterData().pilotList;

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario,
            pilotList : pilotList
        });
        Game.replaceScene(testScene);
        assertOfActivePilot();
    };

    function assertOfActivePilot() {
        assert.equal(Game.currentScene.pilotSpriteArray['right'].opacity,1,'右側パイロットスプライトが表示されている');
        assert.equal(Game.currentScene.pilotSpriteArray['left'].opacity,0.5,'左側パイロットスプライトが半透明になる');
        assert.equal(Game.currentScene.getStoryIndex(),3,'ストーリーインデックスが次に進む');
        finishTest();
    }
}