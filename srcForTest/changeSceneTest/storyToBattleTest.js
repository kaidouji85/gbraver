var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var testScenarioData = require('../testlib/testScenarioData');
var game = require('../../src/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var testScenario = testScenarioData().getMasterData();
    var Game;

    initGame();
    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData(),
            scenarioData : testScenario
        });

        Game.start();
        Game.onload = onLoad;
    }

    function onLoad(){
        Game.changeStoryScene('moveStoryToBattle');
        pushNextButton();
    }

    function pushNextButton(){
        Game.ee.once('sendMessage', assertOfMessaage);
        testUtil.touch(Game.currentScene);
        testUtil.touch(Game.currentScene);
    }

    function assertOfMessaage(message,data){
        var expextData = {
            enemyId : 'landozer',
            pilotId : 'akane',
            routineId : 'attack3'
        };
        assert.equal(message,'startSinglePlay','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expextData,'サーバ送信データが正しい');
        //TODO ローディング画面を追加する
        Game.currentScene.tl.delay(60).then(doServerResp);

    }

    function doServerResp() {
        var serverResp = {
            'test001@gmail.com' : {
                userId : 'test001@gmail.com',
                status : testDataInst.getPlayerData('test001@gmail.com').status
            },
            'nonePlayerCharacter' : {
                userId : 'nonePlayerCharacter',
                status : testDataInst.getPlayerData('test002@gmail.com').status
            }
        };
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.emitServerResp('gameStart',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'battle','戦闘画面へ遷移する');
        assert.equal(Game.getBattleMode(),'story','戦闘モードがストーリーである');
        Game.ee.once('sendMessage', testUtil.finishTest);
    }
}