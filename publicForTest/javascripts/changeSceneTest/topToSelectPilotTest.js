enchant();
window.onload = topToRoomSelect;

function topToRoomSelect(){
    var assert = chai.assert;
    var Game;
    var pilotList = getPilotList();
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png',
            pilotList : pilotList,
            armdozerList : getArmdozerList()
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