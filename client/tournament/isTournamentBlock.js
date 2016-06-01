/**
 * 指定したデータがトーナメントブロックか否かを判定する
 *
 * @param data データ
 * @returns {boolean} 判定結果
 */
export default function isTournamentBlock(data) {
    return !!data.right && !!data.left;
}