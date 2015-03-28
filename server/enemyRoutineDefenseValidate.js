var NONE_PLAYER_CHARACTER = 'nonePlayerCharacter';

function enemyRoutineDefenseValidate(command,statusArray) {
    var ret = command;

    if(command.method==='defenth'){
        if (command.param.battery > statusArray[NONE_PLAYER_CHARACTER].battery ) {
            var battery = statusArray[NONE_PLAYER_CHARACTER].battery>0 ? 1 : 0;
            ret = {
                method : 'defenth',
                param : {
                    battery : battery
                }
            };
        }
    }

    return ret;
}

module.exports = enemyRoutineDefenseValidate;