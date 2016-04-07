var testUtil = require('../testlib/testUtil');
var game = require('../../../../client/game/game');

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
        assertOfRoomInfoWindow();

    }

    function assertOfRoomInfoWindow() {
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getStatus(),'空き','ルーム0のステータスが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getUsers(),'None','ルーム0の入室ユーザが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[1].getStatus(),'対戦中','ルーム1のステータスが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[1].getUsers(),
            'test001@gmail.com<br>test002@gmail.com<br>','ルーム1の入室ユーザが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[2].getStatus(),'対戦相手募集中','ルーム2のステータスが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[2].getUsers(),'test003@gmail.com<br>','ルーム2の入室ユーザが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[3].getStatus(),'空き','ルーム3のステータスが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[3].getUsers(),'None','ルーム3の入室ユーザが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[4].getStatus(),'空き','ルーム4のステータスが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[4].getUsers(),'None','ルーム4の入室ユーザが正しい');
        enterRoom();
    }

    function enterRoom(){
        //ルーム2を押す
        testUtil.touch(Game.currentScene.enterRoomButtonArray[2]);
        Game.ee.once('sendMessage', sendEnterRoomCommand);
    }

    function sendEnterRoomCommand(message,data){
        var expect = {
            roomId : 2
        };
        assert.equal(message, 'enterRoom', '入室処理のサーバ送信メッセージ名が正しい');
        assert.deepEqual(expect, data, '入室処理のサーバ送信データが正しい');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム0ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム1ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム2ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム3ボタンが非表示');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),false,'ルーム4ボタンが非表示');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        assert.equal(Game.currentScene.refreshButton.getVisible(),false,'更新ボタンが非表示');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        Game.currentScene.tl.delay(30).then(successEnterRoom);
    }

    function successEnterRoom() {
        Game.ee.emit('serverResp', 'succesEnterRoom',{});
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),true,'退出ボタンが表示されている');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'プレイヤーの入室待ち','メッセージが正しい');
        testUtil.finishTest();
    }
}
