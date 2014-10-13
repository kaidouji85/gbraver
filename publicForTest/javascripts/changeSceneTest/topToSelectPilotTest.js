enchant();
window.onload = topToRoomSelect;

function topToRoomSelect(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG'
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