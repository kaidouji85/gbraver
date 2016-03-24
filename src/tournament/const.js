/**
 * トーナメント表関連の定数
 */
module.exports = {
    /**
     * トーナメントブロックの状態定数
     */
    TOURNAMENT_STATE: {
        NO_RESULT: 0,
        LEFT_WIN: 1,
        RIGHT_WIN: 2
    },

    /**
     * ノードタイプ
     */
    TYPE: {
        TOURNAMENT_BLOCK: 'TOURNAMENT_BLOCK',
        PLAYER: 'PLAYER',
        ENEMY: 'ENEMY',
        BOSS_ENEMY: 'BOSS_ENEMY'
    }
};