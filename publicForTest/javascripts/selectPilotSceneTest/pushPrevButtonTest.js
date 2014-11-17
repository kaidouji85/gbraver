enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = selectArmdozer;

function selectArmdozer(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectPilotScene({
            selectPilotId : 'iori',
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.replaceScene(testScene);
        pushPrevButton();
    };

    function pushPrevButton(){
        testScene.onPushPrevButton(assertOfPushPrevButton)
        touch(testScene.prevButton);
    }

    function assertOfPushPrevButton(){
        finishTest();
    }
}