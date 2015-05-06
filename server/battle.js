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
    var superGuardArray = {};
    var boostBatteryArray = {};
    var abilityArray = {};

    that.MAX_ACTIVE = 5000;
    that.ATACK_HIT = 1;
    that.ATACK_MISS = 2;
    that.ATACK_GUARD = 3;
    that.ATACK_CRITICAL = 4;
    that.MAX_BATTERY = 5;

    (function() {
        for(var uid in statusArray){
            maxHpArray[uid] = statusArray[uid].hp;
            stunAttackArray[uid] = false;
            guardBreakArray[uid] = false;
            plusPowerArray[uid] = 0;
            superGuardArray[uid] = 1;
            boostBatteryArray[uid] = true;
            abilityArray[uid] = true;
        }
    })()
    
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
        var atackBattery = command.atackBattery;
        var defenthBattery = command.defenthBattery;
        var damage = 0;
        var hit = that.ATACK_MISS;
        var defenseUserId = getDefenseUserId();

        //フェイント攻撃 または 攻撃回避
        if(atackBattery===0 || atackBattery<defenthBattery){
            damage = 0;
            hit = that.ATACK_MISS;
        }
        else {
            //ダメージ計算
            var basicDamage = statusArray[atackUserId].weapons[atackBattery].power - statusArray[defenseUserId].defense;
            var batteryDiff = atackBattery - defenthBattery - 1;
            var plusDamage = batteryDiff * 100;
            if(plusDamage<0){
                plusDamage = 0;
            }
            damage = basicDamage + plusDamage + plusPowerArray[atackUserId];
            hit = that.ATACK_HIT;

            //ガード
            if(atackBattery===defenthBattery && guardBreakArray[atackUserId]===false){
                damage = damage / 2;
                hit = that.ATACK_GUARD;
                if( statusArray[defenseUserId].ability.type === 'hyperArmor' ) {
                    damage *= statusArray[defenseUserId].ability.value;
                }
            }
            //クリティカル
            else if (defenthBattery === 0) {
                damage = damage * 2;
                hit = that.ATACK_CRITICAL;
            }

            //スタン攻撃判定
            if(stunAttackArray[atackUserId] && hit!==that.ATACK_GUARD && hit!==that.ATACK_MISS){
                statusArray[defenseUserId].active = -that.MAX_ACTIVE/2;
            }

            //スーパーガード判定
            damage = damage * superGuardArray[defenseUserId];
            superGuardArray[defenseUserId] = 1;
        }

        if( damage < 0 ) {
            damage = 0;
        }
        damage = Math.floor(damage);

        statusArray[atackUserId].overHeatFlag = false;
        statusArray[atackUserId].battery -= atackBattery;
        statusArray[atackUserId].active = 0;

        statusArray[defenseUserId].hp -= damage;
        statusArray[defenseUserId].battery -= defenthBattery;

        stunAttackArray[atackUserId] = false;
        guardBreakArray[atackUserId] = false;
        plusPowerArray[atackUserId] = 0;
        atackUserId = null;

        return {
            hit: hit,
            damage: damage
        };
    };
    
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
        } else if(type === 'superGuard'){
            superGuardArray[atackUserId] = statusArray[atackUserId].pilot.value;
        }
    }

    /**
     * アームドーザアビリティチェックおよび発動
     */
    that.doArmdozerAbility = function(){
        var isEffective = false;
        var playerId = '';
        for (var uid in statusArray) {
            var thresholdHp = statusArray[uid].ability.threshold * maxHpArray[uid];
            if(thresholdHp>=statusArray[uid].hp && abilityArray[uid]){
                isEffective = true;
                playerId = uid;
                abilityArray[uid] = false;
                if(statusArray[uid].ability.type ==='boostBattery') {
                    executeBoostBattery(uid);
                } else if(statusArray[uid].ability.type ==='boostActive') {
                    execuetActive(uid);
                } else if (statusArray[uid].ability.type === 'boostPower') {
                    executeBoostPower(uid);
                }
            }
        }

        return {
            isEffective: isEffective,
            playerId: playerId
        };
    }

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

    function executeBoostBattery(userId) {
        statusArray[userId].battery += statusArray[userId].ability.battery;
        if (statusArray[userId].battery > that.MAX_BATTERY) {
            statusArray[userId].battery = that.MAX_BATTERY
        }
    }

    function execuetActive(userId) {
        statusArray[userId].active += that.MAX_ACTIVE * statusArray[userId].ability.active;
        if (statusArray[userId].active > that.MAX_ACTIVE) {
            statusArray[userId].active = that.MAX_ACTIVE
        }
    }

    function executeBoostPower(userId) {
        var power = statusArray[userId].ability.power;
        for(var i=1; i<=5; i++){
            statusArray[userId].weapons[i].power += power;
        }
    }

    return that;
};

module.exports = battle;