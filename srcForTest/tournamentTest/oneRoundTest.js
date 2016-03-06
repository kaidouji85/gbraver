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
            participants: {
                left: {
                    left: {
                        left:{pilotId: 'kyoko'},
                        right:{pilotId: 'akane'}
                    },
                    right: {
                        left: {pilotId: 'iori'},
                        right: {pilotId: 'akira'}
                    }
                },
                right:{
                    left: {
                        left:{pilotId: 'kyoko'},
                        right:{pilotId: 'akane'}
                    },
                    right: {
                        left: {pilotId: 'iori'},
                        right: {pilotId: 'akira'}
                    }
                }
            },
            masterData: testData.getMasterData()
        });

        testGame.currentScene.addChild(testTournament);
        testUtil.finishTest();
    }
}