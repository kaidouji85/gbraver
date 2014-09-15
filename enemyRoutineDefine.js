var attackRouitneList = {};
var defenseRoutineList = {};

var ROUTINE_ID_ZERO = 'zero';
var ROUTINE_ID_ATTACK_3 = 'attack3'

//*******************************
// 0攻撃 0防御
//*******************************
attackRouitneList[ROUTINE_ID_ZERO] = function(statusArray) {
    return getAttackCommand(0);
}

defenseRoutineList[ROUTINE_ID_ZERO] = function(statusArray) {
    return getDefenseCommand(0);
}

//*******************************
// 3攻撃 1防御
//*******************************
attackRouitneList[ROUTINE_ID_ATTACK_3] = function(statusArray) {
    var command = getChargeCommand();
    if(statusArray.nonePlayerCharacter.battery >= 3){
        command = getAttackCommand(3);
    }
    return command;
}

defenseRoutineList[ROUTINE_ID_ATTACK_3] = function(statusArray) {
    var command = getDefenseCommand(0);
    if(statusArray.nonePlayerCharacter.battery >= 1){
        command = getDefenseCommand(1);
    }
    return command;
}

function getAttackCommand(attackBattery){
    var command = {
        method : 'atack',
        param : {
            battery : attackBattery
        }
    };
    return command;
}

function getChargeCommand() {
    var command = {
        method : 'charge'
    }
    return command;
}

function getDefenseCommand(defenseBattery){
    var command = {
        method : 'defenth',
        param : {
            battery : defenseBattery
        }
    };
    return command;
}

module.exports.getAttackRoutine = function(routineId) {
    return attackRouitneList[routineId];
}

module.exports.getDefenseRoutine = function(routineId) {
    return defenseRoutineList[routineId];
}