enchant();
var gbraverDebug = {};
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozer();
};

function setArmdozer(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene();
        selectArmdozer();
    };
    
    function selectArmdozer(){
        //console.log('ランドーザを選択する');
        touch(Game.setArmdozerScene.armdozerButtonArray[1]);
        
        Game.onSendMessage(function(message,data){
            var expect = {
                armdozerId : 'landozer'
            };
            assert.equal(message,'setArmdozer','サーバ送信メッセージが正しい');
            assert.deepEqual(data,expect,'メッセージパラメータが正しい');
            console.log('finish');
            $('title').text('finish');
        });
    }
}
