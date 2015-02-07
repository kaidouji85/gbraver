enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackCriticalAnimeTest;

function attackCriticalAnimeTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
    };
    var testGame = gameBase();
    var testScene;
    var AttackAnime;

    testGame.start();
    testGame.onload = initAnime;

    function initAnime(){
        testScene = battleSceneBase({
            userId : 'test002@gmail.com',
            statusArray : statusArray
        });
        testScene.refreshMertor({
            'test001@gmail.com' : {
                hp : 3200,
                battery : 5,
                active : 5000
            },
            'test002@gmail.com' : {
                hp : 4700,
                battery : 5,
                active : 3000
            }
        });
        testGame.pushScene(testScene);
        playAnime();
    }

    function playAnime(){
        var attackAnimeParam = {
            attackUserId : 'test001@gmail.com',
            hit : 4,
            damage : 5000,
            atackBattery : 3,
            defenthBattery : 0,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 0,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1
                }
            }
        }
        AttackAnime = attackAnime({
            battleScene : testScene
        });
        AttackAnime.play(attackAnimeParam,assertAnimeEnd);
    }

    function assertAnimeEnd(){
        var playerFrame = testScene.charaSpriteArray['test002@gmail.com'].frame;
        assert.equal(playerFrame,testGame.FRAME_DAMAGE,"HPが0なのでプレイヤーのモーションが「ダメージ」である");
        finishTest();
    }
}