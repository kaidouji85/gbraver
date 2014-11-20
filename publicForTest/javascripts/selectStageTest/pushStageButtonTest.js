enchant();

window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectStageScene({
            stageData : testDataInst.getStageData(),
            armdozerList : testDataInst.getArmdozerData()
        });
        Game.replaceScene(testScene);
        pushStageButton();
    }

    function pushStageButton(){
        testScene.onPushStageButon(assertOfPushStageButton);
        touch(testScene.stageButtonArray[1]);
    }

    function assertOfPushStageButton(enemyId,routineId){
        assert.equal(enemyId,'granBraver','敵IDが正しい');
        assert.equal(routineId,'attack3','ルーチンIDが正しい');
        finishTest();
    }
}