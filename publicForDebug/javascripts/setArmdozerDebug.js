enchant();
var gbraverDebug = {};
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozer();
};

function setArmdozer(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeArmdozerConfigScene();
        selectArmdozer();
    };
    
    function selectArmdozer(){
        Game.setArmdozerScene.onSelectArmdozer(function(data){
            var expect = {
                armdozerId : 'landozer'
            };
            assert.deepEqual(data,expect,'メッセージパラメータが正しい');
            console.log('finish');
            $('title').text('finish');
        });
        console.log('ランドーザを選択する');
    }
}
