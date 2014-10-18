enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game;
    var pilotList = [
        {
            id : 'kyoko',
            name : '恭子',
            pict : 'kyoko.png',
            shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
            type : 'quickCharge',
            battery : 3
        },
        {
            id : 'akane',
            name : '茜',
            pict : 'akane.png',
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'quickCharge',
            battery : 3
        },
        {
            id : 'iori',
            name: '伊織',
            pict: 'iori.png',
            shout: 'この一撃に、全てを掛ける！！',
            type: 'quickCharge',
            battery: 3
        }
    ];
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png',
            pilotList : pilotList
        });
        Game.start();
        Game.onload = function(){
            Game.changeSelectPilotScene();
            pushIoriButton();
        };
    }

    function pushIoriButton(){
        touch(Game.currentScene.pilotButtonArray[2]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        Game.onSendMessage(assertOfSendMessage)
        touch(Game.currentScene.okButton);
    }

    function assertOfSendMessage(message,data){
        var expectData = {
            pilotId : 'iori'
        };
        assert.equal(message,'setPilot','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'サーバ送信データが正しい');
        Game.currentScene.tl.delay(30).then(emitServeResp);
    }

    function emitServeResp(){
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('successSetPilot',true);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに遷移する');
        assert.equal(Game.getPilotPict(),'iori.png','パイロット画像名が正しい');
        finishTest();
    }

}