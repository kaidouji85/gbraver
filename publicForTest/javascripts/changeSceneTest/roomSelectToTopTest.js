enchant();
window.onload = roomSelectToTop;

function roomSelectToTop(){
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
            Game.changeRoomSelectScene();
            pushChangeButton();
        };
    }

    function pushChangeButton(){
        console.log('戻るボタンを押す');
        touch(Game.roomSelectScene.prevButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene, 'top', 'トップ画面へ遷移する');
        finishTest();
    }
}