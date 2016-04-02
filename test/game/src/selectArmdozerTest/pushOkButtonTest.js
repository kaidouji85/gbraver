var testData = require('../testlib/testData');
var selectArmdozerScene = require('../../../../client/scene/selectArmdozerScene');
var testUtil = require('../testlib/testUtil');
var gameBase = require('../../../../client/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectArmdozerScene({
            selectArmdozerId : 'granBraver',
            armdozerList : testDataInst.getMasterData().armdozerList
        });
        Game.replaceScene(testScene);
        Game.currentScene.tl.delay(30).then(pushArmdozerButton);
    };

    function pushArmdozerButton(){
        testUtil.touch(Game.currentScene.armdozerButtonArray[1]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        testUtil.touch(Game.currentScene.okButton);
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
        testUtil.finishTest();
    }

}