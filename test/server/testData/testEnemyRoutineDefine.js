var attackRouitneList = {};
var defenseRoutineList = {};

//**************************
// 攻撃0、防御0
//**************************
attackRouitneList['zero'] = function(statusArray) {
    var command = {
        method : 'atack',
        param : {
            battery : 0
        }
    };
    return command;
}

defenseRoutineList['zero'] = function(statusArray) {
    var command = {
        method : 'defenth',
        param : {
            battery : 0
        }
    };
    return command;
}

//**************************
// パイロットスキル発動
//**************************
attackRouitneList['pilotSkill'] = function(statusArray) {
    var command = {
        method : 'pilotSkill'
    };
    return command;
}

defenseRoutineList['pilotSkill'] = function(statusArray) {
    var command = {
        method : 'defenth',
        param : {
            battery : 0
        }
    };
    return command;
}

//**************************
// 3攻撃
//**************************
attackRouitneList['attack3'] = function(statusArray) {
    var command = {
        method : 'atack',
        param : {
            battery : 3
        }
    };
    return command;
}

defenseRoutineList['attack3'] = function(statusArray) {
    var command = {
        method : 'defenth',
        param : {
            battery : 0
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