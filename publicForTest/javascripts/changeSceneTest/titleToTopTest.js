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
            Game.changeTitleScene();
            Game.currentScene.tl.delay(1).then(assertOfBgm);
        };
    }

    function assertOfBgm(){
        assert.equal(Game.bgm.getBgm(),Game.assets[Game.SOUND_TITLE],'タイトル画面のBGMに設定されている');
        pushStartButton();
    }

    function pushStartButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.currentScene.startButton);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップ画面に遷移する');
        assert.deepEqual(Game.bgm.getBgm(),Game.assets[Game.SOUND_CONFIG],'トップ画面のBGMに設定されている');
        finishTest();
    }
}