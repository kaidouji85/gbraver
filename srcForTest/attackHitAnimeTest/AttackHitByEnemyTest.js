var testData = require('../testlib/testData');
var gameBase = require('../../src/game/gameBase');
var attackAnime = require('../../src/animation/attackAnime');
var battleSceneBase = require('../../src/scene/battleSceneBase');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = function(){
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
            hit : 1,
            damage : 1600,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 3100,
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
        var playerHp = testScene.merter.hpNumberArray['test002@gmail.com'].getValue();
        var playerBattery = testScene.merter.batteryMerterArray['test002@gmail.com'].getValue();
        var playerFrame = testScene.charaSpriteArray['test002@gmail.com'].frame;
        var enemyActive = testScene.merter.activeBarArray['test001@gmail.com'].getValue();
        var enemyBattery = testScene.merter.batteryMerterArray['test001@gmail.com'].getValue();
        var enemyFrame = testScene.charaSpriteArray['test001@gmail.com'].frame;

        assert.equal(playerHp,3100,'プレイヤーのHPが減っている');
        assert.equal(playerBattery,3,"プレイヤーのバッテリーが正しい");
        assert.equal(playerFrame,testGame.FRAME_STAND,"プレイヤーのモーションが「立ち」である");
        assert.equal(enemyActive,0,"敵のアクティブゲージが0である");
        assert.equal(enemyBattery,2,"敵のバッテリーが正しい");
        assert.equal(enemyFrame,testGame.FRAME_STAND,"敵のモーションが「立ち」である");

        testUtil.finishTest();
    }
}