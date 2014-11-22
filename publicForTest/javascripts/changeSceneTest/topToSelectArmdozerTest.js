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
        touch(Game.topScene.selectArmdozerButton);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'selectArmdozer','パイロット選択シーンに遷移する');
        finishTest();
    }
}