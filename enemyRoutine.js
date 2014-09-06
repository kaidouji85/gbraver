function enemyRoutine(spec,my){
    var that = {};
    var respData = null;

    that.setRespData = function(data){
        respData = data;
    }

    that.getCommand = function() {
        var command = {
            method : null,
            param : null
        };

        if(respData===null){
            command.method = 'ready';
        }

        return command;
    }

    return that;
}

module.exports = enemyRoutine;
