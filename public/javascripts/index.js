enchant();
window.onload = function() {
    var socket;
    var roomId;
    var userId;
    var inputs = null;
    
    socket = io.connect(location.origin);
    roomId = $("meta[name=roomId]").attr('content');
    userId = $("meta[name=userId]").attr('content');

    //全プレイヤーの入室処理が完了した時に呼び出させる処理
    socket.on("startGame", function(data) {
        console.log(data);
        game({
            roomId : roomId,
            userId : userId,
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
