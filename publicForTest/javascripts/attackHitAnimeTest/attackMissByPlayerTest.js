enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackHitAnimeTest;

function attackHitAnimeTest(){
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
            userId : 'test001@gmail.com',
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
            hit : 2,
            damage : 0,
            atackBattery : 1,
            defenthBattery : 2,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 4,
                    active : 0,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 3,
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
        var playerActive = testScene.activeBarArray['test001@gmail.com'].getValue();
        var playerBattery = testScene.batteryMertorArray['test001@gmail.com'].getValue();
        var playerFrame = testScene.charaSpriteArray['test001@gmail.com'].frame;
        var enemyHp = testScene.hpMertorArray['test002@gmail.com'].getValue();
        var enemyBattery = testScene.batteryMertorArray['test002@gmail.com'].getValue();
        var enemyFrame = testScene.charaSpriteArray['test002@gmail.com'].frame;

        assert.equal(playerActive,0,"プレイヤーのアクティブゲージが0である");
        assert.equal(playerBattery,4,"プレイヤーのバッテリーが正しい");
        assert.equal(playerFrame,testGame.FRAME_STAND,"プレイヤーのモーションが「立ち」である");
        assert.equal(enemyHp,4700,'敵のHPが減っていない');
        assert.equal(enemyBattery,3,"敵のバッテリーが正しい");
        assert.equal(enemyFrame,testGame.FRAME_STAND,"敵のモーションが「立ち」である");

        finishTest();
    }
}