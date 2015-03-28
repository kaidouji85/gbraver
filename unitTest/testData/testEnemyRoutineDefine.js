var attackRouitneList = {};
var defenseRoutineList = {};

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

module.exports.getAttackRoutine = function(routineId) {
    return attackRouitneList[routineId];
}

module.exports.getDefenseRoutine = function(routineId) {
    return defenseRoutineList[routineId];
}