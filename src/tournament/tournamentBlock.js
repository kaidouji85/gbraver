var TOURNAMENT_STATE = require('./const').TOURNAMENT_STATE;

/**
 * トーナメントブロック
 * @param spec 初期化定数
 *        spec.x x座標
 *        spec.y y座標
 *        spec.image 画像データ
 *        spec.width スプライトの横サイズ
 *        spec.height スプライトの縦サイズ
 *        spec.state トーナメントブロックの状態
 */
module.exports = function tournamentBlock(spec) {
    var that = new Sprite(spec.width || 32, spec.height || 32);

    (function() {
        that.image = spec.image;
        that.frame = spec.state || TOURNAMENT_STATE.NO_RESULT;
        that.x = spec.x || 0;
        that.y = spec.y || 0;
    })();

    return that;
}