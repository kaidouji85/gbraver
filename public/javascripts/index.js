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

    //ルームへ入室する
    socket.emit("enterRoom", {
        roomId : roomId,
        userId : userId
    });
    
    //入室成功
    socket.on('succesEnterRoom',function(){
        console.log('succesEnterRoom');
    });

    //全プレイヤーの入室処理が完了した時に呼び出させる処理
    socket.on("gameStart", function(data) {
        console.log(data);
        var statusArray = {};
        for(var uid in data){
            statusArray[uid] = data[uid].status;
        }
        Game = game({
            userId : userId,
            statusArray : statusArray
        });
        Game.start();
        Game.onReady(function(){
            socket.emit('command',{method:'ready'});
        });
    });
    
    socket.on('resp', function(data) {
        var phase = data.phase;
        switch(phase){
            case 'wait':
                Game.doWaitPhase(data);
                break;
        }
    });
};
