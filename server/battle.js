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
    var maxHpArray = {};
    var stunAttackArray = {};
    var guardBreakArray = {};
    var plusPowerArray = {};

    that.MAX_ACTIVE = 5000;
    that.ATACK_HIT = 1;
    that.ATACK_MISS = 2;
    that.ATACK_GUARD = 3;
    that.ATACK_CRITICAL = 4;
    that.MAX_BATTERY = 5;

    init();
    function init() {
        for(var uid in statusArray){
            maxHpArray[uid] = statusArray[uid].hp;
            stunAttackArray[uid] = false;
            guardBreakArray[uid] = false;
            plusPowerArray[uid] = 0;
        }
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
                    if(statusArray[uid].battery < that.MAX_BATTERY) {
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
        var damage = 0;
        var defenseUserId = getDefenseUserId();

        statusArray[atackUserId].overHeatFlag = false;
        if(atackBattery===0){
            damage = 0;
            hit = that.ATACK_MISS;
        } else if (atackBattery < defenthBattery) {
            damage = 0;
            hit = that.ATACK_MISS;
        } else {
            damage = getDamage(statusArray[atackUserId],statusArray[defenseUserId],atackBattery,defenthBattery)  + plusPowerArray[atackUserId];
            if(atackBattery === defenthBattery){
                if(guardBreakArray[atackUserId]===true){
                    hit = that.ATACK_HIT;
                }else {
                    damage = damage / 2;
                    hit = that.ATACK_GUARD;
                }
            } else {
                if (defenthBattery === 0) {
                    damage = damage * 2;
                    hit = that.ATACK_CRITICAL;
                } else {
                    hit = that.ATACK_HIT;
                }
                if(stunAttackArray[atackUserId]){
                    statusArray[defenseUserId].active = -that.MAX_ACTIVE/2;
                }
            }
        }

        statusArray[atackUserId].battery -= atackBattery;
        statusArray[atackUserId].active = 0;
        statusArray[defenseUserId].hp -= damage;
        statusArray[defenseUserId].battery -= defenthBattery;
        stunAttackArray[atackUserId] = false;
        guardBreakArray[atackUserId] = false;
        plusPowerArray[atackUserId] = 0;
        atackUserId = null;

        var ret = {
            hit: hit,
            damage: damage
        };
        return ret;
    };

    function getDefenseUserId(){
        var defenseUserId = null;
        for (var uid in statusArray) {
            if (uid !== atackUserId) {
                defenseUserId = uid;
                break;
            }
        }
        return defenseUserId;
    }

    function getDamage(attackStatus,defenseStatus,attackBattery,defenseBattery){
        var damage = attackStatus.weapons[attackBattery].power;
        var diff = attackBattery - defenseBattery;
        damage += diff*defenseStatus.defense;
        return damage;
    }
    
    /**
     * チャージ 
     */
    that.charge = function(){
        statusArray[atackUserId].battery = that.MAX_BATTERY;
        statusArray[atackUserId].active = statusArray[atackUserId].overHeatFlag ? -that.MAX_ACTIVE : 0;
        statusArray[atackUserId].overHeatFlag = true;
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

    /**
     * パイロットスキル発動
     */
    that.doPilotSkill = function() {
        var type = statusArray[atackUserId].pilot.type;
        statusArray[atackUserId].skillPoint -= 1;
        if(type === 'quickCharge') {
            statusArray[atackUserId].battery += statusArray[atackUserId].pilot.battery;
            if(statusArray[atackUserId].battery > that.MAX_BATTERY) {
                statusArray[atackUserId].battery = that.MAX_BATTERY;
            }
        } else if(type === 'recoverHp') {
            statusArray[atackUserId].hp += maxHpArray[atackUserId] * statusArray[atackUserId].pilot.value;
            if(statusArray[atackUserId].hp > maxHpArray[atackUserId]){
                statusArray[atackUserId].hp = maxHpArray[atackUserId];
            }
        }else if(type === 'stunAttack'){
            stunAttackArray[atackUserId] = true;
        } else if(type === 'guardBreak') {
            guardBreakArray[atackUserId] = true;
            plusPowerArray[atackUserId] = statusArray[atackUserId].pilot.value;
        }
    }
    
    return that;
};

module.exports = battle;