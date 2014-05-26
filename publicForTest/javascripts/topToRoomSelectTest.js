enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    topToRoomSelect();
};

function topToRoomSelect(){
    var Game = game({
        userId : 'test001@gmail.com'        
    });
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        pushBattleRoomButton();
    };
    
    function pushBattleRoomButton(){
        //console.log('対戦ルーム入室ボタンを押す');
        Game.topScene.tl.delay(60).then(function(){
            Game.topScene.emitPushBattleRoom();
        });
        
        Game.onChangeScene(function(scene){
            assert.equal(scene,'selectRoom','ルーム選択画面へ遷移する');
            console.log('finish');
            $('title').text('finish');
        });
    }
}