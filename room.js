var battle = require('./battle.js');
const PHASE_PREPARE = 'prepare';
const PHASE_WAIT = 'wait';
const PHASE_ATACK_COMMAND = 'atackCommand';
const PHASE_DEFENTH_COMMAND = 'defenthCommand';
const PHASE_DAMAGE = 'damage';
const PHASE_CHARGE = 'charge';
const PHASE_GAME_END = 'gameEnd';

function room(){
    var that = {};
    var users = {};
    var Battle = null;
    var phase = '';
    var inputFlag = {};
    var atackCommand = '';
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
            status.skillPoint = 1;
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
            case PHASE_GAME_END:
            case PHASE_WAIT:
            case PHASE_DAMAGE:
            case PHASE_CHARGE:
                if (method === 'ok') {
                    inputFlag[userId] = true;
                }   
                break;
            case PHASE_ATACK_COMMAND:
                if (atackUserId==userId) {
                    if(method==='atack'){
                        atackCommand = 'atack';
                        atackBattery = param.battery;
                        inputFlag[userId] = true;
                    } else if(method==='charge') {
                        atackCommand = 'charge';
                        inputFlag[userId] = true;
                    }
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
            case PHASE_CHARGE:
                if(Battle.isEnd()===true){
                    ret = {
                        winner : Battle.getWinPlayer(),
                        phase : PHASE_GAME_END
                    };
                } else {
                    ret = Battle.doWaitPhase();
                    ret.phase = PHASE_WAIT;
                    atackUserId = ret.atackUserId;
                }
                break;
            case PHASE_WAIT:
                ret = {
                    phase : PHASE_ATACK_COMMAND
                };
                break;
            case PHASE_ATACK_COMMAND:
                if(atackCommand==='atack'){
                    ret = {
                        phase : PHASE_DEFENTH_COMMAND
                    };
                } else if (atackCommand==='charge') {
                    Battle.charge();
                    ret = {
                        phase : PHASE_CHARGE
                    };
                }
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
        ret.statusArray = createRespStatusArray();
        inputFlag = {};
        return ret;
    };

    function createRespStatusArray(){
        var nowStatus = Battle.getStatusArray();
        var statusArray = {};
        for(var i in nowStatus){
            statusArray[i] = {};
            statusArray[i].hp = nowStatus[i].hp;
            statusArray[i].active = nowStatus[i].active;
            statusArray[i].battery = nowStatus[i].battery;
        }
        return statusArray;
    }

    that.isGameEnd = function(){
        if(phase===PHASE_GAME_END){
            return true;
        } else {
            return false;
        }
    };

    that.getUserIdList = function(){
        var userIdList = new Array();
        for(var uid in users){
            userIdList.push(uid);
        }
        return userIdList;
    }

    return that;    
}

module.exports = room;