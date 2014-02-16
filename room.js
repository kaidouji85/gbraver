var battle = require('./battle.js');
const PHASE_PREPARE = 'prepare';
const PHASE_WAIT = 'wait';
const PHASE_ATACK_COMMAND = 'atackCommand';
const PHASE_DEFENTH_COMMAND = 'defenthCommand';
const PHASE_DAMAGE = 'damage';

function room(){
    var that = {};
    var users = {};
    var Battle = null;
    var phase = '';
    var inputFlag = {};
    var atackUserId = -1;
    var atackBattery = 0;
    var defenthBattery = 0;
    
    that.addUser = function(user){
        var userId = user.userId;
        users[userId] = user;
    };
    
    that.isGameStart = function(){
        return Object.keys(users).length===2;    
    };
    
    that.getUsers = function(){
      return users;  
    };
    
    that.initBattle = function(){
        var statusArray = {};
        for (var i in users) {
            var userId = users[i].userId;
            var status = users[i].status;
            status.active = 0;
            status.battery = 5;
            statusArray[userId] = status;
        }
        Battle = battle({statusArray : statusArray});
        phase = PHASE_PREPARE;
    };
    
    that.setCommand = function(userId,method,param){
        switch(phase) {
            case PHASE_PREPARE:
                if (method === 'ready') {
                    inputFlag[userId] = true;
                }
                break;
            case PHASE_WAIT:
            case PHASE_DAMAGE:
                if (method == 'ok') {
                    inputFlag[userId] = true;
                }   
                break;
            case PHASE_ATACK_COMMAND:
                if (atackUserId==userId && method==='atack') {
                    atackBattery = param.battery;
                    inputFlag[userId] = true;
                } else if (method === 'ok') {
                    inputFlag[userId] = true;
                }
                break;
           case PHASE_DEFENTH_COMMAND:
                if (atackUserId!=userId && method==='defenth') {
                    defenthBattery = param.battery;
                    inputFlag[userId] = true;
                } else if (method === 'ok') {
                    inputFlag[userId] = true;
                }     
                break;
        }
    };
    
    that.isInputFinish = function(){
        return Object.keys(inputFlag).length === 2;
    };
    
    that.executePhase = function(){
        var ret = null;
        switch(phase) {
            case PHASE_PREPARE:
            case PHASE_DAMAGE:
                ret = Battle.doWaitPhase();
                ret.phase = PHASE_WAIT;
                atackUserId = ret.atackUserId;
                break;
            case PHASE_WAIT:
                ret = {
                    phase : PHASE_ATACK_COMMAND
                };
                break;
            case PHASE_ATACK_COMMAND:
                ret = {
                    phase : PHASE_DEFENTH_COMMAND
                };
                break;
            case PHASE_DEFENTH_COMMAND:
                ret = Battle.atack({
                    atackBattery : atackBattery,
                    defenthBattery : defenthBattery
                });
                ret.phase = PHASE_DAMAGE;
                ret.atackBattery = atackBattery;
                ret.defenthBattery = defenthBattery;
                break;
        }
        phase = ret.phase;
        inputFlag = {};
        return ret;
    };

    return that;    
}

module.exports = room;