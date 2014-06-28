enchant();
window.onload = setArmdozer;

function setArmdozer(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeSetArmdozerScene();
            selectArmdozer();
        };
    }
    
    function selectArmdozer(){
        //console.log('ランドーザを選択する');
        touch(Game.setArmdozerScene.armdozerButtonArray[1]);
        Game.onSendMessage(assertOfChangeScene);
    }

    function assertOfChangeScene(message,data){
        var expect = {
            armdozerId : 'landozer'
        };
        assert.equal(message,'setArmdozer','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expect,'メッセージパラメータが正しい');
        finishTest();
    }
}
