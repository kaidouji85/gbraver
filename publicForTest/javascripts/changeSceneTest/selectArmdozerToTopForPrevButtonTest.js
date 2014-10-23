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
            Game.changeSelectArmdozerScene();
            pushPrevButton();
        };
    }

    function pushPrevButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.currentScene.prevButton);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに遷移する');
        assert.equal(Game.getArmdozerPict(),'GranBraver.PNG','選択画像が変わらない');
        finishTest();
    }

}