// TODO １ブロック戦以外も更新できるようにする
// TODO ユニットテストを書く
import {TOURNAMENT_STATE} from './const';
import __ from 'underscore';

/**
 * 第3ブロックの状態を更新する
 *
 * @param data 第3ブロックのデータ
 * @returns {Object} 更新した第3ブロック
 */
function update1Block(data) {
    return __.extend({}, data, {
        state: TOURNAMENT_STATE.LEFT_WIN
    });
}

/**
 * 第2ブロックの状態を更新する
 *
 * @param data 第2ブロックのデータ
 * @returns {Object} 更新した第2ブロック
 */
function update2Block(data) {
    return __.extend({}, data, {
        left: update1Block(data.left),
        right: update1Block(data.right)
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

    return __.extend({}, table, {
        left: update2Block(table.left),
        right: update2Block(table.right)
    });
}