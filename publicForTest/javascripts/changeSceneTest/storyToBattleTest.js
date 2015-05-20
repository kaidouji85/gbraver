enchant();
window.onload = doTest;

//TODO サーバレスポンスを返す、戦闘シーン切り替え、の手順を作る

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var testScenario = testScenarioData();
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
        Game.onSendMessage(assertOfMessaage);
        touch(Game.currentScene);
        touch(Game.currentScene);
    }

    function assertOfMessaage(message,data){
        var expextData = {
            enemyId : 'landozer',
            pilotId : 'akane',
            routineId : 'attack3'
        };
        assert.equal(message,'startSinglePlay','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expextData,'サーバ送信データが正しい');
        finishTest();
    }
}