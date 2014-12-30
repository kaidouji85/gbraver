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
            armdozerPict : 'Landozer.PNG'
        });
        Game.start();
        Game.onload = changeTitileScene;
    }

    function changeTitileScene(){
        Game.changeTitleScene();
        pushStartButton();
    }

    function pushStartButton(){
        Game.currentScene.onPushStartButton(assertOfPushStart);
        touch(Game.currentScene.startButton);
    }

    function assertOfPushStart(){
        assert.equal(Game.currentScene.startButton.getVisible(),false,'スタートボタンが非表示');
        finishTest();
    }
}

