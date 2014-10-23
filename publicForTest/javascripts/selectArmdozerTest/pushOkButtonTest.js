enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var armdozerList = getArmdozerList();

    Game.start();
    Game.onload = function(){
        testScene = selectArmdozerScene({
            selectArmdozerId : 'granBraver',
            armdozerList : armdozerList
        });
        Game.replaceScene(testScene);
        Game.currentScene.tl.delay(30).then(pushArmdozerButton);
    };

    function pushArmdozerButton(){
        touch(Game.currentScene.armdozerButtonArray[1]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        touch(Game.currentScene.okButton);
        Game.currentScene.onPushOkButton(assertOfPushArmdozerButton);

    }

    function assertOfPushArmdozerButton(armdozerId){
        assert.equal(armdozerId,'landozer','選択したアームドーザのIDが正しい');
        Game.currentScene.tl.delay(30).then(assertOfMessageWindow);

    }

    function assertOfMessageWindow(){
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージウインドウが表示される');
        assert.equal(Game.currentScene.armdozerButtonArray[0].getVisible(),false,'アームドーザボタン0が非表示');
        assert.equal(Game.currentScene.armdozerButtonArray[1].getVisible(),false,'アームドーザボタン1が非表示');
        assert.equal(Game.currentScene.armdozerButtonArray[2].getVisible(),false,'アームドーザボタン2が非表示');
        assert.equal(Game.currentScene.okButton.getVisible(),false,'決定ボタンが非表示');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        finishTest();
    }

}