enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    roomSelectToTop();
};

function roomSelectToTop(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeRoomSelectScene();
        console.log('戻るボタンを押す');
        touch(Game.roomSelectScene.prevButton);
        Game.onChangeScene(function(scene) {
            assert.equal(scene, 'top', 'トップ画面へ遷移する');
            console.log('finish');
            $('title').text('finish');
        });        
    };        
}