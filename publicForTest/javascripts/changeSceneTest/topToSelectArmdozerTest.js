enchant();
window.onload = doTest;

function doTest(){
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
            pushSelectArmdozerButton();
        };
    }

    function pushSelectArmdozerButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.topScene.selectArmdozerButton);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'selectArmdozer','パイロット選択シーンに遷移する');
        finishTest();
    }
}