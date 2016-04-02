var testData = require('../testlib/testData');
var selectPilotScene = require('../../../../client/scene/selectPilotScene');
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
        testScene = selectPilotScene({
            selectPilotId : 'akane',
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.replaceScene(testScene);
        //TODO : アサーション事項は後で書く
        Game.currentScene.tl.delay(30).then(pushKyokoButton);
    };

    function pushKyokoButton(){
        testUtil.touch(Game.currentScene.pilotButtonArray[0]);
        Game.currentScene.tl.delay(30).then(testUtil.finishTest);
    }

}