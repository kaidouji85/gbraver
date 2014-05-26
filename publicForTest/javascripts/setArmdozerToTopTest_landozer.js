enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    setArmdozerToTop_landozer();
};

function setArmdozerToTop_landozer(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene();
        pushLAndozer();
    };
    
    function pushLAndozer(){
        console.log('ランドーザボタンを押す');
        Game.setArmdozerScene.tl.delay(20).then(function(){
            Game.setArmdozerScene.pushArmdozerButton(0);
        });
        
        Game.onSendMessage(function(message,data){
            //TODO : 「message,dataの検証はsetArmdozerScnenTest.jsで実行済み」というニュアンスのことを書きたい
            Game.onChangeScene(function(scene){
                assert.equal(scene,'top','トップ画面へ遷移する');
                console.log('finish');
                $('title').text('finish');
            });
            Game.emitServerResp('successSetArmdozer',{});
        });        
    } 
}