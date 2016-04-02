var testData = require('../testlib/testData');
var selectArmdozerScene = require('../../../../client/scene/selectArmdozerScene');
var testUtil = require('../testlib/testUtil');
var gameBase = require('../../../../client/game/gameBase');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = selectArmdozerScene({
            selectArmdozerId : 'granBraver',
            armdozerList : testDataInst.getMasterData().armdozerList
        });
        Game.replaceScene(testScene);
        assertOfBgm();
    };

    function assertOfBgm() {
        assert.equal(Game.bgm.getBgm(),null,'BGなしに設定されている');
        testUtil.finishTest();
    }
}