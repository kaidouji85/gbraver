import __ from 'underscore';
import * as CONST from './const';
import isTournamentBlock from './isTournamentBlock';

// TODO テストを書く
/**
 * 勝敗が決したブロックを一つにまとめる
 *
 * @param data トーナメントデータ
 * @returns {Object} まとめた後のトーナメントデータ
 */
export default function compressionBlock(data) {
    if(!isTournamentBlock(data)) {
        return data;
    }

    if(data.state === CONST.TOURNAMENT_STATE.LEFT_WIN) {
        return compressionBlock(data.left);
    }

    if (data.state === CONST.TOURNAMENT_STATE.RIGHT_WIN) {
        return compressionBlock(data.right);
    }

    return __.extend({}, data, {
        right: compressionBlock(data.right),
        left: compressionBlock(data.left)
    });
}