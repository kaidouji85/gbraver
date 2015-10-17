var testUtil = require('../testlib/testUtil');
var game = require('../../src/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = initRoomSelectScene;
    }

    function initRoomSelectScene() {
        var roomInfo = {
            '0' : [],
            '1' : ['test001@gmail.com','test002@gmail.com'],
            '2' : ['test003@gmail.com'],
            '3' : [],
            '4' : []
        };
        Game.changeRoomSelectScene(roomInfo);
        enterRoom();

    }

    function enterRoom(){
        //ルーム3を押す
        testUtil.touch(Game.currentScene.enterRoomButtonArray[3]);
        Game.onSendMessage(sendEnterRoomCommand);
    }

    function sendEnterRoomCommand(message,data){
        Game.currentScene.tl.delay(30).then(enterRoomError);
    }

    function enterRoomError() {
        Game.emitServerResp('enterRoomError','任意のエラーメッセージ。');
        Game.currentScene.tl.delay(1).then(assertOfErrorMessage);
    }

    function assertOfErrorMessage(){
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'任意のエラーメッセージ。','メッセージが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム0ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム1ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム2ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム3ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム4ボタンが非表示');
        assert.equal(Game.currentScene.refreshButton.getVisible(),false,'更新ボタンが非表示');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),false,'退出ボタンが非表示');
        assert.equal(Game.currentScene.okButton.getVisible(),true,'OKボタンが表示される');
        Game.currentScene.tl.delay(30).then(pushOkButton);

    }

    function pushOkButton(){
        testUtil.touch(Game.currentScene.okButton);
        Game.currentScene.tl.delay(1).then(assertOfRedrawRoomList);

    }

    function assertOfRedrawRoomList(){
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが非表示');
        assert.equal(Game.currentScene.okButton.getVisible(),false,'OKボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム0ボタンが表示される');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム1ボタンが表示される');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム2ボタンが表示される');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム3ボタンが表示される');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム4ボタンが表示される');
        assert.equal(Game.currentScene.refreshButton.getVisible(),true,'更新ボタンが表示される');
        assert.equal(Game.currentScene.prevButton.getVisible(),true,'戻るボタンが表示される');

        testUtil.finishTest();
    }
}
