/**
 * 指定したデータがトーナメントブロックか否かを判定する
 *
 * @param data データ
 * @returns {boolean} 判定結果
 *                    true  : トーナメントブロックではない
 *                    false : トーナメントブロックである
 */
function isNotTournamentBlock(data) {
    return !data.right && !data.left;
}

/**
 * 対戦相手を取得する
 * 
 * @param data トーナメントデータ
 * @param id プレイヤーID
 * @returns {Object} 対戦相手のデータ
 */
export default function getOpponent(data, id) {
    if (isNotTournamentBlock(data)) {
        return null;
    }

    let target = 
        data.left.id && data.left.id === id ? data.right :
        data.right.id && data.right.id === id ? data.left :
        null;
    if (target) {
        return target;
    }

    let left = getOpponent(data.left, id);
    if (left) {
        return left;
    }

    let right = getOpponent(data.right, id);
    if (right) {
        return right;
    }

    return null;
}