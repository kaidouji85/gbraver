enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = selectArmdozer;

function selectArmdozer(){
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
            pilotList : pilotList
        });
        Game.replaceScene(testScene);
        finishTest();   //TODO : ボタン生成チェックは後で書く
    };
}