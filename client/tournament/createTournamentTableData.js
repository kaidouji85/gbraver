import __ from 'underscore';
import {TOURNAMENT_STATE, ID_TYPE} from './const';

/**
 * トーナメント表のデータを生成する
 *
 * @param enemies 敵のデータ
 * @param playerData プレイヤーデータ
 * @returns {Object} トーナメント表のデータ
 */
export default function createTournamentTableData(enemies, playerData) {
    return {
        left: {
            left: {
                left: __.extend({}, playerData, {id: ID_TYPE.PLAYER}),
                right: __.extend({}, enemies[0], {id: 'enemy1'}),
                state: TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: __.extend({}, enemies[1], {id: 'enemy2'}),
                right: __.extend({}, enemies[2], {id: 'enemy3'}),
                state: TOURNAMENT_STATE.NO_RESULT
            },
            state: TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                left: __.extend({}, enemies[3], {id: 'enemy4'}),
                right: __.extend({}, enemies[4], {id: 'enemy5'}),
                state: TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: __.extend({}, enemies[5], {id: 'enemy6'}),
                right: __.extend({}, enemies[6], {id: ID_TYPE.BOSS}),
                state: TOURNAMENT_STATE.NO_RESULT
            },
            state: TOURNAMENT_STATE.NO_RESULT
        },
        state: TOURNAMENT_STATE.NO_RESULT
    };
}