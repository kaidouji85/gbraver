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
        Game.currentScene.tl.delay(30).then(pushOkButton);
    };

    function pushOkButton(){
        touch(Game.currentScene.prevButton);
        Game.currentScene.onPushPrevButton(finishTest);
    }

}