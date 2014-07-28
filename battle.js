var ce = require('cloneextend');

/**
 * 戦闘ロジック
 * @param {Object} spec
 * @param {Object} my
 */
var battle = function(spec,my){
    var that = {};
    
    that.MAX_ACTIVE = 5000;
    that.ATACK_HIT = 1;
    that.ATACK_MISS = 2;
    that.ATACK_GUARD = 3;
    that.ATACK_CRITICAL = 4;

    var statusArray = ce.clone(spec.statusArray);
    var atackUserId = null;
    
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
    that.atack = function(command) {
            var hit = 0;
            var atackBattery = command.atackBattery;
            var defenthBattery = command.defenthBattery;
            var damage = statusArray[atackUserId].weapons[atackBattery].power;

            if(atackBattery < defenthBattery){
                damage = 0;
                hit = that.ATACK_MISS;
            } else if(atackBattery === defenthBattery){
                damage = damage/2;
                hit = that.ATACK_GUARD;
            } else {
                damage = damage + 100*(atackBattery -1 -defenthBattery);
                if(defenthBattery === 0){
                    damage = damage*2;
                    hit = that.ATACK_CRITICAL;
                } else {
                    hit = that.ATACK_HIT;
                }
            }

            /*
            if(defenthBattery === 0) {
                damage = damage*2;
                hit = that.ATACK_CRITICAL;
            }else if(atackBattery > defenthBattery){
                damage = damage;
                hit = that.ATACK_HIT;
            } else if(atackBattery === defenthBattery) {
                damage = damage/2;
                hit = that.ATACK_GUARD;
            } else {
                damage = 0;
                hit = that.ATACK_MISS;
            }
            */

            var defenthUserId = null;
            for(var uid in statusArray) {
                if(uid !== atackUserId) {
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
                hit : hit,
                damage : damage
            };
            return ret;
    };
    
    /**
     * チャージ 
     */
    that.charge = function(){
        statusArray[atackUserId].battery = 5;
        statusArray[atackUserId].active = 0;
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