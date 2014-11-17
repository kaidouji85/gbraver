enchant();
window.onload = topToRoomSelect;

function topToRoomSelect(){
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
            pilotList : testDataInst.getMasterData().pilotList
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSelectPilotButton();
        };
    }

    function pushSelectPilotButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.topScene.selectPilotButton);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'selectPilot','パイロット選択シーンに遷移する');
        finishTest();
    }
}