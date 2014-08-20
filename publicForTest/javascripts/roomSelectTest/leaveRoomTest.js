enchant();
window.onload = roomSelectToBattle;

function roomSelectToBattle(){
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
            //console.log('ルーム2で入室');
            touch(Game.roomSelectScene.enterRoomButtonArray[2]);
            Game.onSendMessage(assertSendMessage);
        };
    }

    function assertSendMessage(message,data) {
        var expectData = {
            roomId: 2
        };
        assert.equal(message, 'enterRoom', 'メッセージが正しい');
        assert.deepEqual(data, expectData, '入室メッセージのパラメータが正しい');
        Game.currentScene.tl.delay(30).then(successEnterRoom);
    }

    function successEnterRoom() {
        Game.emitServerResp('succesEnterRoom',{});
        Game.currentScene.tl.delay(30).then(assertOfSuccessEnterRoom);
    }

    function assertOfSuccessEnterRoom() {
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),true,'退出ボタンが表示されている');
        pushLeaveRoomButton();
    }

    function pushLeaveRoomButton(){
        Game.onSendMessage(assertOfSendMessage);
        touch(Game.currentScene.leaveRoomButton);
    }

    function assertOfSendMessage(message,data) {
        assert.equal(message,'leaveRoom','メッセージが正しい');
        assert.equal(data,null,'データが正しい');
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),false,'退出ボタンが非表示である');
        successLeaveRoom();
    }

    function successLeaveRoom() {
        Game.emitServerResp('successLeaveRoom',null);
        Game.currentScene.tl.delay(30).then(assertOfLeaveRoom);
    }

    function assertOfLeaveRoom() {
        assert.equal(Game.currentScene.prevButton.getVisible(),true,'戻るボタンが表示されている');
        assert.equal(Game.currentScene.enterRoomButtonArray[0].getVisible(),true,'ルーム0ボタンが表示されている');
        assert.equal(Game.currentScene.enterRoomButtonArray[1].getVisible(),true,'ルーム1ボタンが表示されている');
        assert.equal(Game.currentScene.enterRoomButtonArray[2].getVisible(),true,'ルーム2ボタンが表示されている');
        assert.equal(Game.currentScene.enterRoomButtonArray[3].getVisible(),true,'ルーム3ボタンが表示されている');
        assert.equal(Game.currentScene.enterRoomButtonArray[4].getVisible(),true,'ルーム4ボタンが表示されている');
        finishTest();
    }
}