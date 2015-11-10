/**
 * アームドーザの武器データを生成して返す
 * 旧データ構造の名残
 * 昔はバッテリー消費量ごとに攻撃力が設定できた
 *
 * @param power 攻撃力
 * @returns {Weapons} 武器データ
 */
function createWeapons(power) {
    return {
        1 : {
            name : '武器',
            power : power
        },
        2 : {
            name : '武器',
            power : power
        },
        3 : {
            name : '武器',
            power : power
        },
        4 : {
            name : '武器',
            power : power
        },
        5 : {
            name : '武器',
            power : power
        }
    }
}