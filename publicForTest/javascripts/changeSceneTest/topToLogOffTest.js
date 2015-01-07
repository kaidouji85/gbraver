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
            pushLogOffButton();
        };
    }

    function pushLogOffButton(){
        touch(Game.currentScene.logOffButton);
        Game.onLogOff(assertOfLogOff);
    }

    function assertOfLogOff(){
        assert.equal(Game.currentScene.logOffButton.getVisible(),false,'ログオフボタンが非表示');
        assert.equal(Game.currentScene.battleRoomButton.getVisible(),false,'対戦ルーム入室ボタンが表示されない');
        assert.equal(Game.currentScene.selectArmdozerButton.getVisible(),false,'アームドーザ選択ボタンが表示されない');
        assert.equal(Game.currentScene.selectStageButton.getVisible(),false,'ステージセレクトボタンが表示されない');
        assert.equal(Game.currentScene.selectPilotButton.getVisible(),false,'パイロット選択ボタンが表示されない');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'ログオフ中','メッセージが正しい');
        finishTest();
    }
}