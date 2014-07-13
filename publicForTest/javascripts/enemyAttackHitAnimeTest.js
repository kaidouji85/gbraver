enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackHitAnimeTest;

function attackHitAnimeTest(){
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
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
            hit : 1,
            damage : 1600,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0
                },
                'test002@gmail.com' : {
                    hp : 3100,
                    battery : 3,
                    active : 3000
                }
            }
        }
        AttackAnime = attackAnime({
            battleScene : testScene
        });
        AttackAnime.play(attackAnimeParam,assertAnimeEnd);
    }

    function assertAnimeEnd(){
        var playerHp = testScene.hpMertorArray['test002@gmail.com'].getValue();
        var playerBattery = testScene.batteryMertorArray['test002@gmail.com'].getValue();
        var playerFrame = testScene.charaSpriteArray['test002@gmail.com'].frame;
        var enemyActive = testScene.activeBarArray['test001@gmail.com'].getValue();
        var enemyBattery = testScene.batteryMertorArray['test001@gmail.com'].getValue();
        var enemyFrame = testScene.charaSpriteArray['test001@gmail.com'].frame;

        assert.equal(playerHp,3100,'プレイヤーのHPが減っている');
        assert.equal(playerBattery,3,"プレイヤーのバッテリーが正しい");
        assert.equal(playerFrame,testGame.FRAME_STAND,"プレイヤーのモーションが「立ち」である");
        assert.equal(enemyActive,0,"敵のアクティブゲージが0である");
        assert.equal(enemyBattery,2,"敵のバッテリーが正しい");
        assert.equal(enemyFrame,testGame.FRAME_STAND,"敵のモーションが「立ち」である");

        finishTest();
    }
}