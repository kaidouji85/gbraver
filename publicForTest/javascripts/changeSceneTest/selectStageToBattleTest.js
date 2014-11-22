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
        touch(Game.currentScene.stageButtonArray[1]);
        Game.onSendMessage(asertOfMessage);
    }

    function asertOfMessage(message,data) {
        var expectData = {
            enemyId : 'granBraver',
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
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('gameStart',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'battle','戦闘画面へ遷移する');
        Game.onSendMessage(finishTest);
    }
}