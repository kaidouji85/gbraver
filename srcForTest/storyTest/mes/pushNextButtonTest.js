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
        testUtil.touch(Game.currentScene);
    }

    function assertOfStory() {
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスがそのまま');
        assert.equal(Game.currentScene.mesWindow.getText(),testScenario[1].param,'セリフが正しい');
        testUtil.finishTest();
    }
}