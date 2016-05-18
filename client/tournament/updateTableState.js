// TODO １ブロック戦以外も更新できるようにする
// TODO ユニットテストを書く
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
 * トーナメントブロックを再帰的に更新する
 *
 * @param block ブロックのデータ
 * @returns {Object} 更新したトーナメントブロック
 */
function updateBlock(block) {
    if (!isTournamentBlock(block)) {
        return block;
    }

    let canUpdate = block.state === TOURNAMENT_STATE.NO_RESULT
        && block.left.state !== TOURNAMENT_STATE.NO_RESULT
        && block.right.state !== TOURNAMENT_STATE.NO_RESULT;
    let newState = canUpdate ? getState(compressionBlock(block)) : block.state;

    return __.extend({}, block, {
        state: newState,
        left: updateBlock(block.left),
        right: updateBlock(block.right)
    });

}

/**
 * トーナメント表を更新する
 *
 * @param table トーナメント表のデータ
 * @param isWin プレイヤーがトーナメントに勝ったか否か
 * @returns {Object} 更新したトーナメント表
 */
export default function updateTableState(table, isWin) {
    if (!isWin) {
        return table;
    }

    return updateBlock(table);
}