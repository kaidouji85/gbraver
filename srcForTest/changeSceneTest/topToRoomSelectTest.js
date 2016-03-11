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
            Game.changeTopScene();
            pushBattleRoomButton();
        };
    }
    
    function pushBattleRoomButton(){
        //console.log('対戦ルーム入室ボタンを押す');
        testUtil.touch(Game.currentScene.battleRoomButton);
        Game.ee.once('sendMessage', sendGetRoomInfo);
    }

    function sendGetRoomInfo(message,data) {
        assert.equal(message,'getRoomInfo','サーバ送信メッセージが正しい');
        assert.equal(data,null,'サーバ送信データが正しい');
        assert.equal(Game.currentScene.battleRoomButton.getVisible(),false,'対戦ルーム入室ボタンが表示されない');
        assert.equal(Game.currentScene.selectArmdozerButton.getVisible(),false,'アームドーザ選択ボタンが表示されない');
        assert.equal(Game.currentScene.selectStageButton.getVisible(),false,'ステージセレクトボタンが表示されない');
        assert.equal(Game.currentScene.selectPilotButton.getVisible(),false,'パイロット選択ボタンが表示されない');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.logOffButton.getVisible(),false,'ログオフボタンが非表示');
        assert.equal(Game.currentScene.mesWindow.getText(),'ルーム情報取得中','メッセージが正しい');
        assert.equal(Game.currentScene.title.getVisible(),true,'画面タイトルが表示される');
        Game.currentScene.tl.delay(30).then(respSuccessGetRoomInfo);
    }

    function respSuccessGetRoomInfo() {
        var data = {
            '0' : [],
            '1' : [],
            '2' : [],
            '3' : [],
            '4' : []
        };
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.ee.emit('serverResp', 'successGetRoomInfo',data);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'selectRoom','ルーム選択画面へ遷移する');
        testUtil.finishTest();
    }
}