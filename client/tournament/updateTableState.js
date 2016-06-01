import __ from 'underscore';
import {TOURNAMENT_STATE, ID_TYPE} from './const';
import compressionBlock from './compressionBlock';
import isTournamentBlock from './isTournamentBlock';

/**
 * 対戦ブロックの状態を計算して返す
 *
 * @param data 対戦ブロックのデータ
 * @returns {number} トーナメントの状態
 */
function getState(data) {
    let dataArray = [data.left.id, data.right.id];

    if ( __.contains(dataArray, ID_TYPE.PLAYER) && __.contains(dataArray, ID_TYPE.BOSS)) {
        return data.left.id === ID_TYPE.PLAYER ? TOURNAMENT_STATE.LEFT_WIN : TOURNAMENT_STATE.RIGHT_WIN;
    }

    if (__.contains(dataArray, ID_TYPE.BOSS)) {
        return data.left.id === ID_TYPE.BOSS ? TOURNAMENT_STATE.LEFT_WIN : TOURNAMENT_STATE.RIGHT_WIN;
    }

    return TOURNAMENT_STATE.LEFT_WIN;
}

/**
 * トーナメント表を更新する
 *
 * この関数はプレイヤーが勝利した前提でトーナメント表を更新する
 *
 * @param table トーナメント表のデータ
 * @returns {Object} 更新したトーナメント表
 */
export default function updateTableState(table) {
    if (!isTournamentBlock(table)) {
        return table;
    }

    let canUpdate = table.state === TOURNAMENT_STATE.NO_RESULT
        && table.left.state !== TOURNAMENT_STATE.NO_RESULT
        && table.right.state !== TOURNAMENT_STATE.NO_RESULT;
    let newState = canUpdate ? getState(compressionBlock(table)) : table.state;

    return __.extend({}, table, {
        state: newState,
        left: updateTableState(table.left),
        right: updateTableState(table.right)
    });
}