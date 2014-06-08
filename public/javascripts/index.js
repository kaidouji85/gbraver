enchant();
window.onload = function() {
    var socket;
    var roomId;
    var userId = $("meta[name=userId]").attr('content');;
    var inputs = null;
    var Game = new game({
        userId : userId
    });
    Game.start();
    Game.onload = function() {
        socket = io.connect(location.origin);

        //ユーザ認証する
        socket.emit('auth', {
            userId : userId
        });

        //ユーザ認証成功
        socket.on('successAuth', function() {
            Game.changeTopScene();
        });
        
        Game.onSendMessage(function(message,data){
            socket.emit(message,data);
        });
        
        socket.on('succesEnterRoom', function() {
            console.log('succesEnterRoom');
        });
        
        socket.on('successSetArmdozer', function(data) {
            Game.emitServerResp('successSetArmdozer',data);
        });        
                
        socket.on("gameStart", function(data){
            Game.emitServerResp('gameStart',data);
        });
        
        socket.on('resp', function(data){
            Game.emitServerResp('resp',data);
        });

        socket.on('dissolveRoom', function(data){
            Game.emitServerResp('dissolveRoom',data);
        });
    };
};