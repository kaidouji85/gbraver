enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackHitAnimeTest;

function attackHitAnimeTest(){
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
    };
    var testGame = gameBase();
    var testScene;

    testGame.start();
    testGame.onload = function(){
        testScene = battleSceneBase({
            userId : 'test001@gmail.com',
            statusArray : statusArray
        });
        testGame.pushScene(testScene);

    }
}