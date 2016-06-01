/**
 * トーナメントシーンの表示テスト
 * 本テストでは同シーンをエラーなく表示できることを確認するため、アサーションは書かない
 */

import tournamentScene from '../../../../client/scene/tournamentScene';
import gameBase from '../../../../client/game/gameBase';
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
                pilotId: 'akane'
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
    let testGame = gameBase();
    let testScene = null;

    testGame.start();
    testGame.onload = initScene;

    function initScene(){
        let testScene = tournamentScene({
            data: TEST_DATA,
            master: testData().getMasterData()
        });
        testGame.replaceScene(testScene);
        testUtil.finishTest();
    }
}