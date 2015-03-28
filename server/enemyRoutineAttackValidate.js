var NONE_PLAYER_CHARACTER = 'nonePlayerCharacter';
var ZERO_ATTACK = {
    method : 'atack',
    param : {
        battery : 0
    }
};
var enemyRoutineAttackValidate = function(command,statusArray) {
    var ret = command;

    if(command.method === 'atack') {
        if(command.param.battery > statusArray[NONE_PLAYER_CHARACTER].battery) {
            ret = ZERO_ATTACK;
        }
    } else if (command.method === 'pilotSkill') {
        if(statusArray[NONE_PLAYER_CHARACTER].skillPoint <= 0){
            ret = ZERO_ATTACK;
        }
    }

    return ret;
}

module.exports = enemyRoutineAttackValidate;