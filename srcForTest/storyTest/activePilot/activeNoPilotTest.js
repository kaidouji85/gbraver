var testData = require('../../testlib/testData');
var storyScene = require('../../../src/scene/storyScene');
var testUtil = require('../../testlib/testUtil');
var testScenarioData = require('../../testlib/testScenarioData');
var gameBase = require('../../../src/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData().getData('activeNoPilotTest');
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
        assert.equal(Game.currentScene.pilotSpriteArray['right'].opacity,0.5,'右側パイロットスプライト半透明になる');
        assert.equal(Game.currentScene.pilotSpriteArray['left'].opacity,0.5,'左側パイロットスプライトが半透明になる');
        assert.equal(Game.currentScene.getStoryIndex(),3,'ストーリーインデックスが次に進む');
        testUtil.finishTest();
    }
}