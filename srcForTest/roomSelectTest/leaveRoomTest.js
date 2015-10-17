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
            var roomInfo = {
                '0' : [],
                '1' : [],
                '2' : [],
                '3' : [],
                '4' : []
            };
            Game.changeRoomSelectScene(roomInfo);
            //console.log('ルーム2で入室');
            testUtil.touch(Game.currentScene.enterRoomButtonArray[2]);
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
        testUtil.touch(Game.currentScene.leaveRoomButton);
    }

    function sendLeaveRoomCommand(message,data) {
        assert.equal(message,'leaveRoom','メッセージが正しい');
        assert.equal(data,null,'データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        assert.equal(Game.currentScene.refreshButton.getVisible(),false,'更新ボタンが非表示である');
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),false,'退出ボタンが非表示である');
        Game.currentScene.tl.delay(30).then(successLeaveRoom);
    }

    function successLeaveRoom() {
        Game.onSendMessage(sendGetRoomInfo);
        Game.emitServerResp('successLeaveRoom',null);
    }

    function sendGetRoomInfo(message,data){
        assert.equal(message,'getRoomInfo','サーバ送信メッセージが正しい');
        assert.equal(data,null,'データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');//TODO : メッセージを”ルーム情報取得中”にする
        assert.equal(Game.currentScene.refreshButton.getVisible(),false,'更新ボタンが非表示である');
        assert.equal(Game.currentScene.leaveRoomButton.getVisible(),false,'退出ボタンが非表示である');
        Game.currentScene.tl.delay(30).then(respSuccessGetRoomInfo);
    }

    function respSuccessGetRoomInfo(){
        Game.emitServerResp('successGetRoomInfo',{
            '0' : [],
            '1' : ['test001@gmail.com','test002@gmail.com'],
            '2' : ['test003@gmail.com','test004@gmail.com'],
            '3' : ['test005@gmail.com'],
            '4' : []
        })
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