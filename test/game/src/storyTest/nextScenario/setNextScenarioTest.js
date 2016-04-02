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
    var testScenario = testScenarioData().getData('nextScenarioTest');

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
        testUtil.touch(Game.currentScene);
    }

    function assertOfStory(nextScenarioId) {
        assert.equal(Game.currentScene.getStoryIndex(),1,'ストーリーインデックスが正しい');
        assert.equal(nextScenarioId,testScenario[1].param,'ステージクリア後に遷移するシナリオIDが正しい');
        testUtil.finishTest();
    }
}