var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var game = require('../../src/game/game');

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
            Game.changeSelectArmdozerScene();
            pushLandozerButton();
        };
    }

    function pushLandozerButton(){
        testUtil.touch(Game.currentScene.armdozerButtonArray[1]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        Game.onSendMessage(assertOfSendMessage)
        testUtil.touch(Game.currentScene.okButton);
    }

    function assertOfSendMessage(message,data){
        var expectData = {
            armdozerId : 'landozer'
        };
        assert.equal(message,'setArmdozer','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'サーバ送信データが正しい');
        Game.currentScene.tl.delay(30).then(emitServeResp);
    }

    function emitServeResp(){
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.emitServerResp('successSetArmdozer',true);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに遷移する');
        assert.equal(Game.getArmdozerId(),'landozer','選択画像が変わる');
        testUtil.finishTest();
    }

}