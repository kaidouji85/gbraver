var testData = require('../../testlib/testData');
var storyScene = require('../../../src/scene/storyScene');
var testUtil = require('../../testlib/testUtil');
var testScenarioData = require('../../testlib/testScenarioData');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData().getData('pilotLeftTest');
    var pilotList = testData().getMasterData().pilotList;

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario,
            pilotList : pilotList
        });
        Game.replaceScene(testScene);
        assertOfLeftPilot();
    };

    function assertOfLeftPilot() {
        assert.equal(Game.currentScene.pilotSpriteArray['left'].visible,true,'左側パイロットスプライトが表示されている');
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスが次に進む');
        testUtil.finishTest();
    }
}