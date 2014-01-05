// enchant.js本体やクラスをエクスポートする
enchant();

/**
 * ページが読み込まれたときに実行される関数
 */
window.onload = function() {
    var socket;         //socket.ioオブジェクト
    var roomId;         //ルームID
    var userId;         //ユーザID
    var enemyUserId;    //敵ユーザID
    var inputs = null;  //全ユーザの入力情報
    
    socket = io.connect(location.origin);
    roomId = $("meta[name=roomId]").attr('content');
    userId = $("meta[name=userId]").attr('content');

    //全プレイヤーの入室処理が完了した時に呼び出させる処理
    socket.on("startGame", function(data) {
        console.log(data);
        for(uid in data){
            if(uid != userId){
                enemyUserId = uid;
            }
        }
        game({
            roomId : roomId,
            userId : userId,
            enemyUserId : enemyUserId,
            usersInfo : data,
            socket : socket
        });
    });

    //ルームへ入室する
    socket.emit("enterRoom", {
        roomId : roomId,
        userId : userId
    });
};
