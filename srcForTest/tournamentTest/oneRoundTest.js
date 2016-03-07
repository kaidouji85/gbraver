var gameBase = require('../../src/game/gameBase');
var testUtil = require('../testlib/testUtil');
var testData = require('../testlib/testData')();
var tournamentTable = require('../../src/tournament/tournamentTable');


enchant();
window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testGame = gameBase();
    var testTournament = null;

    testGame.start();
    testGame.onload = initTournament;

    function initTournament(){
        testTournament = tournamentTable({
            participants: [
                {pilotId: 'kyoko'},
                {pilotId: 'akane'},

                {pilotId: 'iori'},
                {pilotId: 'akira'},

                {pilotId: 'kyoko'},
                {pilotId: 'akane'},

                {pilotId: 'iori'},
                {pilotId: 'akira'}
            ],
            masterData: testData.getMasterData()
        });

        testGame.currentScene.backgroundColor = 'black';
        testGame.currentScene.addChild(testTournament);
        testUtil.finishTest();
    }
}