var ce = require('cloneextend');

function dbMock(spec,my){
    var that = {};
    var userArray = [
        {
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko'
        }
    ];

    that.getUserData = function(userId,cb){
        for(var i=0; i<userArray.length; i++){
            if(userId===userArray[i].userId){
                cb(null,ce.clone(userArray[i]));
            }
        }
    }

    return that;
}

module.exports = dbMock;