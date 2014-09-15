function enemyRoutine(spec,my){
    var that = {};
    var attackRoutine = spec.attackRoutine;
    var defenseRoutine = spec.defenseRoutine;
    var NONE_PLAYER_CHARACTER = 'nonePlayerCharacter';
    var respData = null;
    var attackUserId = null;

    that.setRespData = function(data){
        respData = data;
    }

    that.getCommand = function() {
        var command = {
            method : 'ok',
            param : null
        };

        if(respData===null){
            command.method = 'ready';
        } else if(respData.phase === 'wait') {
            attackUserId = respData.atackUserId;
        } else if(respData.phase === 'defenthCommand' && attackUserId !== NONE_PLAYER_CHARACTER) {
            //TODO : ここに思考ルーチンを追加する
            /*
            command.method = 'defenth';
            command.param = {
                battery : 0
            };
            */
            command = defenseRoutine(respData.statusArray);
        } else if(respData.phase === 'atackCommand' && attackUserId === NONE_PLAYER_CHARACTER) {
            command = attackRoutine(respData.statusArray);
        }

        return command;
    }

    return that;
}

module.exports = enemyRoutine;
