enchant();
window.onload = roomSelectToBattle;

function roomSelectToBattle(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png'
        });
        Game.start();
        Game.onload = function(){
            var roomInfo = {
                '0' : [],
                '1' : [],
                '2' : [],
                '3' : [],
                '4' : []
            };
            Game.changeRoomSelectScene(roomInfo);
            //console.log('ルーム2で入室');
            touch(Game.roomSelectScene.enterRoomButtonArray[2]);
            Game.onSendMessage(sendEnterRoomCoomand);
        };
    }

    function sendEnterRoomCoomand(message,data) {
        var expectData = {
            roomId: 2
        };
        assert.equal(message, 'enterRoom', 'メッセージが正しい');
        assert.deepEqual(data, expectData, '入室メッセージのパラメータが正しい');
        Game.currentScene.tl.delay(30).then(successEnterRoom);
    }

    function successEnterRoom() {
        Game.emitServerResp('succesEnterRoom',{});
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),true,'退出ボタンが表示されている');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'プレイヤーの入室待ち','メッセージが正しい');
        pushLeaveRoomButton();
    }

    function pushLeaveRoomButton(){
        Game.onSendMessage(sendLeaveRoomCommand);
        touch(Game.currentScene.leaveRoomButton);
    }

    function sendLeaveRoomCommand(message,data) {
        assert.equal(message,'leaveRoom','メッセージが正しい');
        assert.equal(data,null,'データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),false,'退出ボタンが非表示である');
        Game.currentScene.tl.delay(30).then(successLeaveRoom);
    }

    function successLeaveRoom() {
        Game.onChangeScene(moveTopScene);
        Game.emitServerResp('successLeaveRoom',null);
    }

    function moveTopScene(scene) {
        assert.equal(scene,'top','トップシーンに遷移する');
        finishTest();
    }
}