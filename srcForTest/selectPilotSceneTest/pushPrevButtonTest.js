var testData = require('../testlib/testData');
var selectPilotScene = require('../../src/scene/selectPilotScene');
var testUtil = require('../testlib/testUtil');
var gameBase = require('../../src/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectPilotScene({
            selectPilotId : 'iori',
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.replaceScene(testScene);
        pushPrevButton();
    };

    function pushPrevButton(){
        testScene.onPushPrevButton(assertOfPushPrevButton)
        testUtil.touch(testScene.prevButton);
    }

    function assertOfPushPrevButton(){
        testUtil.finishTest();
    }
}