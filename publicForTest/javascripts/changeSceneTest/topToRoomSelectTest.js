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
            pushBattleRoomButton();
        };
    }
    
    function pushBattleRoomButton(){
        //console.log('対戦ルーム入室ボタンを押す');
        touch(Game.topScene.battleRoomButton);
        Game.onChangeScene(assertOfChangeScene);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'selectRoom','ルーム選択画面へ遷移する');
        finishTest();
    }
}