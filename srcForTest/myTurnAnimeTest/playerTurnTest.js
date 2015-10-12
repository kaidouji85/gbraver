var testData = require('../testlib/testData');
var gameBase = require('../../src/game/gameBase');
var myTurnAnime = require('../../src/animation/myTurnAnime');
var battleSceneBase = require('../../src/scene/battleSceneBase');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = doTest;

function doTest(){
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
    };
    var testGame = gameBase();
    var testScene;
    var MyTurnAnime;

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
        var myTurnAnimeParam = {
            atackUserId : 'test001@gmail.com'
        }
        MyTurnAnime = myTurnAnime({
            battleScene : testScene
        });
        MyTurnAnime.play(myTurnAnimeParam,assertAnimeEnd);
    }

    function assertAnimeEnd(){
        testUtil.finishTest();
    }
}