enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozerToTop_pushPrevButton();
};

function setArmdozerToTop_pushPrevButton(){
    var Game = game({
        userId : 'test001@gmail.com',
        armdozerPict : 'GranBraver.PNG'
    });
    var armdozerIdList = [
        {
            name:'グランブレイバー',
            id : 'granBraver'
        },
        {
            name:'ランドーザ',
            id:'landozer'
        }
    ];
    var data = {
        armdozerIdList :armdozerIdList
    }

    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene(data);
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