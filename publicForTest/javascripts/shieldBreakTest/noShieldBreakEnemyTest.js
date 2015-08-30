enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test005@gmail.com' : testDataInst.getPlayerData('test005@gmail.com').status,
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
                active : 5000,
                specialPoint : 0
            },
            'test005@gmail.com' : {
                hp : 2100,
                battery : 5,
                active : 3000,
                specialPoint : 1000
            }
        });
        testGame.pushScene(testScene);
        playAnime();
    }

    function playAnime(){
        var attackAnimeParam = {
            attackUserId : 'test001@gmail.com',
            hit : 1,
            damage : 800,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1,
                    specialPoint: 0
                },
                'test005@gmail.com' : {
                    hp : 2100,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1,
                    specialPoint: 200
                }
            }
        }
        AttackAnime = attackAnime({
            battleScene : testScene
        });
        AttackAnime.play(attackAnimeParam,assertAnimeEnd);
    }

    function assertAnimeEnd(){
        var pict = testGame.currentScene.charaSpriteArray['test005@gmail.com'].image;
        assert.deepEqual(pict,testGame.assets[testGame.PICT_PREFIX+'Guardias.png'],
            'ガーディアスの画像が変化しない');
        finishTest();
    }
}