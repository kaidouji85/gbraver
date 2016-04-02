var testData = require('../../testlib/testData');
var storyScene = require('../../../../../client/scene/storyScene');
var testUtil = require('../../testlib/testUtil');
var testScenarioData = require('../../testlib/testScenarioData');
var gameBase = require('../../../../../client/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var testScenario = testScenarioData().getData('pilotRightTest');
    var pilotList = testData().getMasterData().pilotList;

    Game.start();
    Game.onload = function(){
        testScene = storyScene({
            scenarioData : testScenario,
            pilotList : pilotList
        });
        Game.replaceScene(testScene);
        assertOfRightPilot();
    };

    function assertOfRightPilot() {
        assert.equal(Game.currentScene.pilotSpriteArray['right'].visible,true,'右側パイロットスプライトが表示されている');
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスが次に進む');
        testUtil.finishTest();
    }
}