enchant();
window.onload = function() {
    var socket;
    var roomId;
    var userId;
    var inputs = null;
    var Game;
    socket = io.connect(location.origin);
    roomId = $("meta[name=roomId]").attr('content');
    userId = $("meta[name=userId]").attr('content');

    //全プレイヤーの入室処理が完了した時に呼び出させる処理
    socket.on("startGame", function(data) {
        console.log(data);
        Game = game({
            roomId : roomId,
            userId : userId,
            usersInfo : data
        });
        
        Game.onSendInput(function(data){
            socket.emit("input",data);
        });
        Game.start();
    });

    //ルームへ入室する
    socket.emit("enterRoom", {
        roomId : roomId,
        userId : userId
    });
    
    //サーバからのレスポンスがきた
    socket.on("resp", function(data) {
        Game.emitResp(data);
    });
    
    //socket.ioの接続が切れた
    socket.on("disconnect", function(data) {
        Game.emitDisconnect(data);
    });
};
