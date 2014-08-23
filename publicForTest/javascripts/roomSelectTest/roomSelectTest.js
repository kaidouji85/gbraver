enchant();
window.onload = enterRoomAndGameStart;

function enterRoomAndGameStart(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeRoomSelectScene();
            enterRoom();
        };
    }

    function enterRoom(){
        //ルーム2を押す
        touch(Game.roomSelectScene.enterRoomButtonArray[2]);
        Game.onSendMessage(sendEnterRoomCommand);
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
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        Game.currentScene.tl.delay(30).then(successEnterRoom);
    }

    function successEnterRoom() {
        Game.emitServerResp('succesEnterRoom',{});
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),true,'退出ボタンが表示されている');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'プレイヤーの入室待ち','メッセージが正しい');
        finishTest();
    }
}
