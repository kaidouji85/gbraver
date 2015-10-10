var testData = require('../testlib/testData');

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
        touch(Game.currentScene.selectStageButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'selectStage','ステージ選択画面へ遷移する');
        finishTest();
    }
}