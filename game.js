//定数
const MAX_PLAYER_NUM = 2;

//サーバ側のゲーム処理
var game = function(spec, my) {
    var that = {};
    var inUsersInfo = {};
    var userInputs = {};
    var Users = spec.Users;
    
    /**
     * ルーム入室 
     * @param {Number} userId
     */
    that.join = function(userId,fn){
        Users.find({userId:userId},function(err,respUsers){
            var userInfo = respUsers[0];
            inUsersInfo[userId] = userInfo;
            if( Object.keys(inUsersInfo).length == MAX_PLAYER_NUM) {
                fn(null,inUsersInfo);    
            }
        });
    };
    
    /**
     * コマンド入力 
     * @param {Number} userId
     * @param {input} input
     */
    that.input = function(userId,input,fn){
        userInputs[userId] = input;
        if(Object.keys(userInputs).length == MAX_PLAYER_NUM) {
            fn(null,{inputs:userInputs});
            userInputs = {};
        }
    };
    
    return that;
};

module.exports = game;