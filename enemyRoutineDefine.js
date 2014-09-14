var attackRouitneList = {};

attackRouitneList['zero'] = function(statusArray) {
    var command = {
        method : 'atack',
        param : {
            battery : 0
        }
    };
    return command;
}

module.exports.getAttackRoutine = function(routineId) {
    return attackRouitneList[routineId];
}