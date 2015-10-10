var testData = require('../testlib/testData');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
    };
    var testGame = gameBase();
    var testScene;
    var ExplosionAnime;

    testGame.start();
    testGame.onload = initAnime;

    function initAnime(){
        testScene = battleSceneBase({
            userId : 'test002@gmail.com',
            statusArray : statusArray
        });
        testGame.pushScene(testScene);
        playAnime();
    }

    function playAnime(){
        ExplosionAnime = explosionAnime({
            battleScene : testScene
        });
        ExplosionAnime.play({
            winner : 'test001@gmail.com',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 0,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        },assertOfEndAnime);
    }

    function assertOfEndAnime(){
        assert.equal(testScene.loseSprite.visible,true,'LOSEが表示される');
        finishTest();
    }
}