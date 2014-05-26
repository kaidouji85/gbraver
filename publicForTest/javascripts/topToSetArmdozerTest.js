enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    topToSetArmdozer();
};

function topToSetArmdozer(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        pushSetArmdozerButton();
    };
    
    function pushSetArmdozerButton(){
        //console.log('アームドーザ選択ボタンを押す');
        Game.topScene.tl.delay(20).then(function(){
            Game.topScene.emitPushSetArmdozer(); 
        });
        
        Game.onChangeScene(function(scene){
            assert.equal(scene,'setArmdozer','アームドーザ選択画面へ遷移する');
            console.log('finish');
            $('title').text('finish');
        });
    }
}