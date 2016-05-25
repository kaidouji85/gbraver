/**
 * トーナメントから戦闘画面に遷移するテスト
 *
 * トーナメントが完了していない場合、戦闘画面に遷移する
 */
import game from '../../../../client/game/game';
import testUtil from '../testlib/testUtil';
import testData from '../testlib/testData';
import CONST from '../../../../client/tournament/const';

const TEST_DATA = {
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
    });

    Game.start();
    Game.onload = function() {
        // トーナメントの状態をテスト用にセットする
        Game.setState({tournamentState: TEST_DATA});
        Game.ee.once('changeScene', changeTournamentScene);
        Game.changeTournamentScene();
    }

    function changeTournamentScene(sceneName) {
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