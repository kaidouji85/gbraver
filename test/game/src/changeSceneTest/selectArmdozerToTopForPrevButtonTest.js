var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var game = require('../../../../client/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.start();
        Game.onload = function(){
            Game.changeSelectArmdozerScene();
            pushPrevButton();
        };
    }

    function pushPrevButton(){
        Game.ee.once('changeScene', assertOfChangeScene);
        testUtil.touch(Game.currentScene.prevButton);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに遷移する');
        assert.equal(Game.getArmdozerId(),'granBraver','選択画像が変わらない');
        testUtil.finishTest();
    }

}