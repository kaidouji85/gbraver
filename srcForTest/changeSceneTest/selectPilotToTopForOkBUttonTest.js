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
            stageData :testDataInst.getStageData()
        });
        Game.start();
        Game.onload = function(){
            Game.changeSelectPilotScene();
            pushIoriButton();
        };
    }

    function pushIoriButton(){
        testUtil.touch(Game.currentScene.pilotButtonArray[2]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        Game.ee.once('sendMessage', assertOfSendMessage)
        testUtil.touch(Game.currentScene.okButton);
    }

    function assertOfSendMessage(message,data){
        var expectData = {
            pilotId : 'iori'
        };
        assert.equal(message,'setPilot','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'サーバ送信データが正しい');
        Game.currentScene.tl.delay(30).then(emitServeResp);
    }

    function emitServeResp(){
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.emitServerResp('successSetPilot',true);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに遷移する');
        assert.equal(Game.getPilotId(),'iori','パイロット画像名が正しい');
        testUtil.finishTest();
    }

}