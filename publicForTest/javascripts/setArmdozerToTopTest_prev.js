enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozerToTop_pushPrevButton();
};

function setArmdozerToTop_pushPrevButton(){
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = pushPrevButton;
    }

    function pushPrevButton(){
        Game.changeSetArmdozerScene();
        //console.log('戻るボタンを押す');
        touch(Game.setArmdozerScene.prevButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene, 'top', 'トップ画面へ遷移する');
        finishTest();
    }
}