var turnTimer = require('../../../../client/turnTimer/turnTimer');
var gameBase = require('../../../../client/game/gameBase');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testGame = gameBase();
    var testTurnTimer = null;

    testGame.start();
    testGame.onload = initTurnTimer;

    function initTurnTimer(){
        testTurnTimer = turnTimer();
        testTurnTimer.x = 160;
        testTurnTimer.y = 240;
        testGame.currentScene.addChild(testTurnTimer);
        setTurnCount();
    }

    function setTurnCount(){
        testTurnTimer.onTimeOut(assertOfTimeOut);
        testTurnTimer.startTurnCount(3);
    }

    function assertOfTimeOut(){
        testUtil.finishTest();
    }
}