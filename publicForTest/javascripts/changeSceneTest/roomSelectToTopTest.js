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
                '2' : ['test002@gmail.com'],
                '3' : [],
                '4' : []
            };
            Game.changeRoomSelectScene(roomInfo);
            pushChangeButton();
        };
    }

    function pushChangeButton(){
        console.log('戻るボタンを押す');
        touch(Game.currentScene.prevButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene, 'top', 'トップ画面へ遷移する');
        finishTest();
    }
}