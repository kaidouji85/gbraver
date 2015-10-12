var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');

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
            pushSelectArmdozerButton();
        };
    }

    function pushSelectArmdozerButton(){
        Game.onChangeScene(assertOfChangeScene);
        testUtil.touch(Game.currentScene.selectArmdozerButton);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'selectArmdozer','パイロット選択シーンに遷移する');
        testUtil.finishTest();
    }
}