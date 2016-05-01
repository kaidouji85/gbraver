/**
 * トーナメントから戦闘画面に遷移するテスト
 */

import tournamentScene from '../../../../client/scene/tournamentScene';
import game from '../../../../client/game/game';
import testUtil from '../testlib/testUtil';
import testData from '../testlib/testData';
import CONST from '../../../../client/tournament/const';

const TEST_DATA = {
    tournamentId: 'basic',

    left: {
        left: {
            left: {
                id: 'player',
                pilotId: 'kyoko'
            },
            right: {
                id: 'enemy1',
                enemyId: 'landozer',
                pilotId: 'akane',
                routineId: 'zero'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                id: 'enemy2',
                pilotId: 'iori'
            },
            right: {
                id: 'enemy3',
                pilotId: 'akira'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        state: CONST.TOURNAMENT_STATE.NO_RESULT
    },
    right: {
        left: {
            left: {
                id: 'enemy4',
                pilotId: 'akira'
            },
            right: {
                pilotId: 'iori'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                id: 'enemy5',
                pilotId: 'akane'
            },
            right: {
                id: 'boss',
                pilotId: 'kyoko'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        state: CONST.TOURNAMENT_STATE.NO_RESULT
    },
    state: CONST.TOURNAMENT_STATE.NO_RESULT
};

enchant();
window.onload = function () {
    let assert = chai.assert;
    let Game = game({
        userId : 'test001@gmail.com',
        armdozerId : 'granBraver',
        pilotId : 'kyoko',
        armdozerList : testData().getMasterData().armdozerList,
        pilotList : testData().getMasterData().pilotList,
        tournamentList: [TEST_DATA]
    });

    Game.start();
    Game.onload = function() {
        Game.ee.once('changeScene', onChangeScene);
        Game.changeTournamentScene('basic');
    }

    function onChangeScene(sceneName) {
        Game.ee.once('sendMessage', onSendMessage);
    }
    
    function onSendMessage(message, data) {
        assert.equal(message, 'startSinglePlay');
        assert.deepEqual(data, {
            enemyId: 'landozer',
            pilotId : 'akane',
            routineId: 'zero'
        });
        testUtil.finishTest();
    }
}