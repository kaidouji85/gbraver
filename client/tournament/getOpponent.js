import * as CONST from './const';
import __ from 'underscore';

/**
 * 指定したデータがトーナメントブロックか否かを判定する
 *
 * @param data データ
 * @returns {boolean} 判定結果
 */
function isTournamentBlock(data) {
    return !!data.right && !!data.left;
}

// TODO テストを書く
/**
 * 勝敗が決したブロックを一つにまとめる
 *
 * @param data トーナメントデータ
 * @returns {Object} まとめた後のトーナメントデータ
 */
function collectBlock(data) {
    if(!isTournamentBlock(data)) {
        return data;
    }

    switch(data.state) {
        case CONST.TOURNAMENT_STATE.LEFT_WIN:
            return collectBlock(data.left);
        case CONST.TOURNAMENT_STATE.RIGHT_WIN:
            return collectBlock(data.right);
        default:
            return __.extend({}, data, {
                right: collectBlock(data.right),
                left: collectBlock(data.left)
            });
    }
}

// TODO テストを書く
/**
 * 指定したパイロットIDが含まれる戦闘ブロックを返す
 *
 * @param data トーナメントデータ
 * @param id パイロットID
 * @returns {Object} トーナメントブロック
 */
function getBLockById(data, id) {
    if (!isTournamentBlock(data)) {
        return null;
    }

    if (data.left.id === id || data.right.id === id) {
        return data;
    }

    let left = getBLockById(data.left, id);
    if(left) {
        return left;
    }

    let right = getBLockById(data.right, id);
    if(right) {
        return right;
    }

    return null;
}

/**
 * 対戦相手を取得する
 * 
 * @param data トーナメントデータ
 * @param id プレイヤーID
 * @returns {Object} 対戦相手のデータ
 */
export default function getOpponent(data, id) {
    let collectData = collectBlock(data);
    let targetBlock = getBLockById(collectData, id);
    if (!targetBlock) {
        return null;
    }

    return targetBlock.left.id === id ? targetBlock.right : targetBlock.left;
}