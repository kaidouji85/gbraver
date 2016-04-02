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
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData()
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSelectStageButton();
        };
    }

    function pushSelectStageButton(){
        testUtil.touch(Game.currentScene.selectStageButton);
        Game.ee.once('changeScene', assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'selectStage','ステージ選択画面へ遷移する');
        testUtil.finishTest();
    }
}