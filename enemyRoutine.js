function enemyRoutine(spec,my){
    var that = {};
    var respData = null;

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
        } else if(respData.phase === 'defenthCommand') {
            //TODO : ここに思考ルーチンを追加する
            command.method = 'defenth';
            command.param = {
                battery : 0
            };
        }

        return command;
    }

    return that;
}

module.exports = enemyRoutine;
