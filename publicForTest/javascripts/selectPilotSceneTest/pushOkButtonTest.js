enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
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

    Game.start();
    Game.onload = function(){
        testScene = selectPilotScene({
            selectPilotId : 'akane',
            pilotList : pilotList
        });
        Game.replaceScene(testScene);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    };

    function pushOkButton(){
        Game.currentScene.onPushOkButton(assertOfPushOkButton);
        touch(Game.currentScene.okButton);
    }

    function assertOfPushOkButton(pilotId){
        assert.equal(pilotId,'akane','元々選択していたパイロットIDが渡される');
        assert.equal(Game.currentScene.okButton.getVisible(),false,'OKボタンが非表示');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        assert.equal(Game.currentScene.pilotButtonArray[0].getVisible(),false,'パイロットアイコン0が非表示');
        assert.equal(Game.currentScene.pilotButtonArray[1].getVisible(),false,'パイロットアイコン1が非表示');
        assert.equal(Game.currentScene.pilotButtonArray[2].getVisible(),false,'パイロットアイコン2が非表示');
        finishTest();
    }

}