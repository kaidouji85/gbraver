/**
 * enchant.jsで基本的な図形を描画するためのユーティリティ
 *
 */

/**
 * 矩形イメージを生成して返す
 *
 * @param {number} width 横幅
 * @param {umber} height 高さ
 * @param {string} fillStyle 色
 * @returns {Object} 矩形イメージ
 */
export function createRect(width, height, fillStyle) {
  let surf = new Surface(width, height);
  surf.context.beginPath();
  surf.context.fillStyle = fillStyle;
  surf.context.fillRect(0, 0, width, height);
  return surf;
}