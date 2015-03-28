var NONE_PLAYER_CHARACTER = 'nonePlayerCharacter';
var ZERO_DEFENSE = {
    method : 'defenth',
    param : {
        battery : 0
    }
};

function enemyRoutineDefenseValidate(command,statusArray) {
    var ret = command;

    if(command.method==='defenth'){
        if(command.param.battery < 0) {
            ret = ZERO_DEFENSE;
        } else if (command.param.battery > 0) {
            ret = ZERO_DEFENSE;
        }

        if (command.param.battery > statusArray[NONE_PLAYER_CHARACTER].battery ) {
            var battery = statusArray[NONE_PLAYER_CHARACTER].battery>0 ? 1 : 0;
            ret = {
                method: 'defenth',
                param: {
                    battery: battery
                }
            };
        }
    }

    return ret;
}

module.exports = enemyRoutineDefenseValidate;