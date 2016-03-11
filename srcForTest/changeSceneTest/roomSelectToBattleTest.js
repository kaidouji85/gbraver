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
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData()
        });
        Game.start();
        Game.onload = function(){
            var roomInfo = {
                '0' : [],
                '1' : [],
                '2' : ['test002@gmail.com'],
                '3' : [],
                '4' : []
            };
            Game.changeRoomSelectScene(roomInfo);
            //console.log('ルーム2で入室');
            testUtil.touch(Game.currentScene.enterRoomButtonArray[2]);
            Game.ee.once('sendMessage', assertSendMessage);
        };
    }

    function assertSendMessage(message,data){
        var expectData = {
            roomId : 2
        };
        assert.equal(message,'enterRoom','メッセージが正しい');
        assert.deepEqual(data,expectData,'入室メッセージのパラメータが正しい');
        successEnterRoom();
    }

    function successEnterRoom(){
        Game.emitServerResp('succesEnterRoom',{});
        gameStart();
    }


    function gameStart() {
        //TODO : データ構造が気持ち悪い。ユーザIDが重複しまくってる。サーバ側の修正も必要だから一筋縄ではいかない。
        var gameStartData = {
            'test001@gmail.com' : {
                userId : 'test001@gmail.com',
                status : testDataInst.getPlayerData('test001@gmail.com').status
            },
            'test002@gmail.com' : {
                userId : 'test002@gmail.com',
                status : testDataInst.getPlayerData('test002@gmail.com').status
            }
        };
        Game.ee.once('changeScene', assertChangeScene);
        Game.emitServerResp('gameStart',gameStartData);
    }

    function assertChangeScene(scene) {
        assert.equal(scene, 'battle', '戦闘画面へ遷移する');
        assert.equal(Game.getBattleMode(),'twoPlay','戦闘モードが対戦プレイである');
        Game.ee.once('sendMessage', assertSendMessage2);
    }

    function assertSendMessage2(message, data){
        var expectData = {
            method : 'ready'
        };
        assert.equal(message, 'command', 'サーバレスポンスメッセージが正しい');
        assert.deepEqual(data, expectData, 'メッセージオプションが正しい');
        testUtil.finishTest();
    }
}