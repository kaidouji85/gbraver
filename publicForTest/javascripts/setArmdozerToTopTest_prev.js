enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozerToTop_pushPrevButton();
};

function setArmdozerToTop_pushPrevButton(){
    var Game;
    Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene();
        pushPrevButton();
    }

    function pushPrevButton(){
        //console.log('戻るボタンを押す');
        touch(Game.currentScene.prevButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene, 'top', 'トップ画面へ遷移する');
        finishTest();
    }
}