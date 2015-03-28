var attackRouitneList = {};
var defenseRoutineList = {};

var ROUTINE_ID_ZERO = 'zero';
var ROUTINE_ID_ATTACK_3_DEFENSE_1 = 'attack3-defense1';
var ROUTINE_ID_ATTACK_1_DEFENSE_1 = 'attack1-defense1';
var ROUTINE_ID_ATTACK_1_DEFENSE_3 = 'attack1-defense3';
var ROUTINE_ID_ZERO_BRAVER = 'zeroBraver';

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
attackRouitneList[ROUTINE_ID_ATTACK_3_DEFENSE_1] = function(statusArray) {
    var command = getChargeCommand();
    if(statusArray.nonePlayerCharacter.battery >= 3){
        command = getAttackCommand(3);
    }
    return command;
}

defenseRoutineList[ROUTINE_ID_ATTACK_3_DEFENSE_1] = function(statusArray) {
    var command = getDefenseCommand(0);
    if(statusArray.nonePlayerCharacter.battery >= 1){
        command = getDefenseCommand(1);
    }
    return command;
}

//*******************************
// 1攻撃 1防御
//*******************************
attackRouitneList[ROUTINE_ID_ATTACK_1_DEFENSE_1] = function(statusArray) {
    var command = getAttackCommand(1);
    return command;
}

defenseRoutineList[ROUTINE_ID_ATTACK_1_DEFENSE_1] = function(statusArray) {
    var command = getDefenseCommand(0);
    if(statusArray.nonePlayerCharacter.battery >= 1){
        command = getDefenseCommand(1);
    }
    return command;
}

//*******************************
// 1攻撃 3防御
//*******************************
attackRouitneList[ROUTINE_ID_ATTACK_1_DEFENSE_3] = function(statusArray) {
    var command = getChargeCommand();
    if(statusArray.nonePlayerCharacter.battery > 3){
        command = getAttackCommand(1);
    }
    return command;
}

defenseRoutineList[ROUTINE_ID_ATTACK_1_DEFENSE_3] = function(statusArray) {
    var command = getDefenseCommand(0);
    if(statusArray.nonePlayerCharacter.battery >= 3){
        command = getDefenseCommand(3);
    }else if(statusArray.nonePlayerCharacter.battery >= 1){
        command = getDefenseCommand(1);
    }
    return command;
}

//*******************************
// ゼロブレイバー
//*******************************
attackRouitneList[ROUTINE_ID_ZERO_BRAVER] = function(statusArray) {
    var command = getAttackCommand(statusArray.nonePlayerCharacter.battery);

    if(statusArray.nonePlayerCharacter.skillPoint>=1 && statusArray.nonePlayerCharacter.hp<2000) {
        command = getPilotSkillCommand();
    } else if ( getPlayerStatus(statusArray).battery == 0 ) {
        command = getAttackCommand(statusArray.nonePlayerCharacter.battery);
    } else if (statusArray.nonePlayerCharacter.battery < 2) {
        command = getChargeCommand();
    } else if(statusArray.nonePlayerCharacter.battery >= 3){
        command = getAttackCommand(3);
    }

    return command;
}

defenseRoutineList[ROUTINE_ID_ZERO_BRAVER] = function(statusArray) {
    var command = getDefenseCommand(1);

    if(statusArray.nonePlayerCharacter.battery >= 3){
        command = getDefenseCommand(3);
    }else {
        command = getDefenseCommand(statusArray.nonePlayerCharacter.battery);
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

function getPilotSkillCommand() {
    return {
        method : 'pilotSkill'
    };
}

function getPlayerStatus(statusArray) {
    for(uid in statusArray){
        if(uid !== 'nonePlayerCharacter'){
            return statusArray[uid];
        }
    }
}

module.exports.getAttackRoutine = function(routineId) {
    return attackRouitneList[routineId];
}

module.exports.getDefenseRoutine = function(routineId) {
    return defenseRoutineList[routineId];
}