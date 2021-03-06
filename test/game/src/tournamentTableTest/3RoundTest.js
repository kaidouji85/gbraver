var gameBase = require('../../../../client/game/gameBase');
var testUtil = require('../testlib/testUtil');
var testData = require('../testlib/testData')();
var tournamentTable = require('../../../../client/tournament/tournamentTable');
var CONST = require('../../../../client/tournament/const');

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
            // 表示位置
            x: 160,
            y: 200,
            // トーナメントデータ
            data: {
                left: {
                    left: {
                        left: { id:'player', pilotId: 'kyoko' },
                        right: { id:'enemy01', pilotId: 'akane' },
                        state: CONST.TOURNAMENT_STATE.LEFT_WIN
                    },
                    right: {
                        left: { id:'enemy02', pilotId: 'iori' },
                        right: { id:'enemy03', pilotId: 'akira' },
                        state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                    },
                    state: CONST.TOURNAMENT_STATE.LEFT_WIN
                },
                right: {
                    left: {
                        left: { id:'enemy04', pilotId: 'akira' },
                        right: { id:'enemy05', pilotId: 'iori' },
                        state: CONST.TOURNAMENT_STATE.LEFT_WIN
                    },
                    right: {
                        left: { id:'enemy06', pilotId: 'akane' },
                        right: { id:'boss', pilotId: 'kyoko' },
                        state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                    },
                    state: CONST.TOURNAMENT_STATE.LEFT_WIN
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            // Gブレイバーのマスタ系データ
            master: testData.getMasterData()
        }


        );

        testGame.currentScene.backgroundColor = 'black';
        testGame.currentScene.addChild(testTournament);
        testUtil.finishTest();
    }
}