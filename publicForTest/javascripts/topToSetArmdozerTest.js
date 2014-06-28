enchant();
window.onload = topToSetArmdozer;

function topToSetArmdozer(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSetArmdozerButton();
        };
    }
    
    function pushSetArmdozerButton(){
        //console.log('アームドーザ選択ボタンを押す');
        touch(Game.topScene.setArmdpzerButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'setArmdozer','アームドーザ選択画面へ遷移する');
        finishTest();
    }
}