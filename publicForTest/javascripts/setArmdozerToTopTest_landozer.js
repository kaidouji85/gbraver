enchant();
window.onload = setArmdozerToTop_landozer;

function setArmdozerToTop_landozer(){
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
            pushLAndozer();
        };
    }
    
    function pushLAndozer(){
        console.log('ランドーザボタンを押す');
        touch(Game.setArmdozerScene.armdozerButtonArray[1]);
        Game.onSendMessage(assertLoading);
    }

    function assertLoading(message,data){
        //TODO : 「message,dataの検証はsetArmdozerScnenTest.jsで実行済み」というニュアンスのことを書きたい
        assert.equal(Game.currentScene.armdozerButtonArray[0].visible,false,'アームドーザ選択ボタン0が非表示である');
        assert.equal(Game.currentScene.armdozerButtonArray[1].visible,false,'アームドーザ選択ボタン1が非表示である');
        assert.equal(Game.currentScene.prevButton.visible,false,'戻るボタンが非表示である');

        Game.currentScene.tl.delay(60).then(function(){
            changeScene();
        });
    }

    function changeScene() {
        Game.onChangeScene(function (scene) {
            assert.equal(scene, 'top', 'トップ画面へ遷移する');
            finishTest();
        });
        Game.emitServerResp('successSetArmdozer', {});
    }
}
