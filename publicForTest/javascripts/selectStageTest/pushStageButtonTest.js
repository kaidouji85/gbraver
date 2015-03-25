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

    function assertOfPushStageButton(enemyId,pilotId,routineId){
        assert.equal(enemyId,'granBraver','敵IDが正しい');
        assert.equal(pilotId,'akane','パイロットIDが正しい');
        assert.equal(routineId,'attack3','ルーチンIDが正しい');
        assert.equal(testScene.mesWindow.getVisible(),true,'メッセージウインドウが表示されている');
        assert.equal(testScene.mesWindow.getText(),'通信待機中','メッセージウインドウのメッセージが正しい');
        assert.equal(testScene.stageButtonArray[0].getVisible(),false,'ボタン0が非表示');
        assert.equal(testScene.stageButtonArray[1].getVisible(),false,'ボタン1が非表示');
        assert.equal(testScene.stageButtonArray[2].getVisible(),false,'ボタン2が非表示');
        assert.equal(testScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        finishTest();
    }
}