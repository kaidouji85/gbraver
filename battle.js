var ce = require('cloneextend');

/**
 * 戦闘ロジック
 * @param {Object} spec
 * @param {Object} my
 */
var battle = function(spec,my){
    var that = {};
    var statusArray = ce.clone(spec.statusArray);
    var atackUserId = null;
    var overHeatFlagArray = {};

    that.MAX_ACTIVE = 5000;
    that.ATACK_HIT = 1;
    that.ATACK_MISS = 2;
    that.ATACK_GUARD = 3;
    that.ATACK_CRITICAL = 4;

    for(var uid in statusArray){
        overHeatFlagArray[uid] = false;
    }
    
    that.getStatusArray = function() {
        return statusArray;
    };
    
    /**
     * ウェイトフェイズ実行 
     * @return
     * {
     *     turn : 経過したターン数
     *     atackUserId : 行動件を取得したユーザID
     * }
     */
    that.doWaitPhase = function() {
        var ret = {
            turn : 0,
            atackUserId : null
        };
        while(true){
            ret.turn ++;
            //アクティブゲージを加算
            for(var uid in statusArray){
                statusArray[uid].active += statusArray[uid].speed;
            }
            
            //アクティブゲージが満タンか確認
            for(var uid in statusArray){
                if(statusArray[uid].active >= that.MAX_ACTIVE){
                    atackUserId = uid;
                    if(statusArray[uid].battery < 5) {
                        statusArray[uid].battery ++;
                    }
                    ret.atackUserId = uid;
                    return ret;
                }
            }
        }
    };
    
    /**
     * 攻撃 
     * @param {Object} command
     */
    that.atack = function (command) {
        var hit = 0;
        var atackBattery = command.atackBattery;
        var defenthBattery = command.defenthBattery;
        var damage = statusArray[atackUserId].weapons[atackBattery].power;

        overHeatFlagArray[atackUserId] = false;
        if (atackBattery < defenthBattery) {
            damage = 0;
            hit = that.ATACK_MISS;
        } else if (atackBattery === defenthBattery) {
            damage = damage / 2;
            hit = that.ATACK_GUARD;
        } else {
            damage = damage + 100 * (atackBattery - 1 - defenthBattery);
            if (defenthBattery === 0) {
                damage = damage * 2;
                hit = that.ATACK_CRITICAL;
            } else {
                hit = that.ATACK_HIT;
            }
        }

        var defenthUserId = null;
        for (var uid in statusArray) {
            if (uid !== atackUserId) {
                defenthUserId = uid;
                break;
            }
        }

        statusArray[atackUserId].battery -= atackBattery;
        statusArray[atackUserId].active = 0;
        statusArray[defenthUserId].hp -= damage;
        statusArray[defenthUserId].battery -= defenthBattery;

        atackUserId = null;

        var ret = {
            hit: hit,
            damage: damage
        };
        return ret;
    };
    
    /**
     * チャージ 
     */
    that.charge = function(){
        var overHeatFlag = overHeatFlagArray[atackUserId];
        statusArray[atackUserId].battery = 5;
        statusArray[atackUserId].active = overHeatFlag ? -that.MAX_ACTIVE : 0;
        overHeatFlagArray[atackUserId] = true;
        atackUserId = null;
    };

    /**
     * ゲーム終了判定
     */
    that.isEnd = function() {
        for(var i in statusArray){
            if(statusArray[i].hp <= 0){
                return true;
            }
        }
        return false;
    }

    /**
     * 勝利したプレイヤー名を取得
     */
    that.getWinPlayer = function() {
        for(var i in statusArray){
            if(statusArray[i].hp > 0){
                return i;
            }
        }
    }
    
    return that;
};

module.exports = battle;