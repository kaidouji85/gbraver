var testData = require('../testlib/testData');
var selectArmdozerScene = require('../../../../client/scene/selectArmdozerScene');
var testUtil = require('../testlib/testUtil');
var gameBase = require('../../../../client/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectArmdozerScene({
            selectArmdozerId : 'granBraver',
            armdozerList : testDataInst.getMasterData().armdozerList
        });
        Game.replaceScene(testScene);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    };

    function pushOkButton(){
        testUtil.touch(Game.currentScene.prevButton);
        Game.currentScene.onPushPrevButton(testUtil.finishTest);
    }
}