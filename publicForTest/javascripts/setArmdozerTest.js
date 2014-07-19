enchant();
window.onload = setArmdozer;

function setArmdozer(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene = setArmdozerScene();

    Game.start();
    Game.onload = function(){
        Game.replaceScene(testScene);
        selectArmdozer();
    };

    function selectArmdozer(){
        //console.log('ランドーザを選択する');
        touch(testScene.armdozerButtonArray[1]);
        testScene.onSelectArmdozer(assertOfChangeScene);
    }

    function assertOfChangeScene(data){
        var expect = {
            armdozerId : 'landozer'
        };
        assert.deepEqual(data,expect,'メッセージパラメータが正しい');
        finishTest();
    }
}
