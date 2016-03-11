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
            Game.changeSelectStageScene();
            pushStageButton();
        };
    }

    function pushStageButton(){
        testUtil.touch(Game.currentScene.stageButtonArray[1]);
        Game.ee.once('sendMessage', asertOfMessage);
    }

    function asertOfMessage(message,data) {
        var expectData = {
            enemyId : 'granBraver',
            pilotId : 'akane',
            routineId : 'attack3'
        };
        assert.equal(message, 'startSinglePlay', 'サーバ送信メッセージが正しい');
        assert.deepEqual(data, expectData, 'サーバ送信データが正しい');
        Game.currentScene.tl.delay(60).then(function(){
            doServerResp();
        });
    }

    function doServerResp(){
        var serverResp = {
            'test001@gmail.com' : {
                userId : 'test001@gmail.com',
                status : testDataInst.getPlayerData('test001@gmail.com').status
            },
            'nonePlayerCharacter' : {
                userId : 'nonePlayerCharacter',
                status : testDataInst.getPlayerData('test001@gmail.com').status
            }
        };
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.emitServerResp('gameStart',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'battle','戦闘画面へ遷移する');
        assert.equal(Game.getBattleMode(),'singlePlay','戦闘モードがシングルプレイである');
        Game.ee.once('sendMessage', testUtil.finishTest);
    }
}