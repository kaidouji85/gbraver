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

    var statusArray = {};
    $.extend(true,statusArray,spec.statusArray);
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

            var defenthUserId = null;
            for(var uid in statusArray) {
                if(uid !== atackUserId) {
                    defenthUserId = uid;
                    break;
                }
            }
            
            statusArray[atackUserId].battery -= atackBattery;
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
    
    return that;
};
