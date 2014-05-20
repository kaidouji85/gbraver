enchant();
window.onload = function() {
    var socket;
    var roomId;
    var userId;
    var inputs = null;
    var Game = new game();
    Game.start();
    Game.onload = function() {
        socket = io.connect(location.origin);
        userId = $("meta[name=userId]").attr('content');

        //ユーザ認証する
        socket.emit('auth', {
            userId : userId
        });

        //ユーザ認証成功
        socket.on('successAuth', function() {
            Game.changeRoomSelectScene();
            Game.roomSelectScene.onEnterRoom(function(data){
                socket.emit('enterRoom',data);
            });
        });

        //入室成功
        socket.on('succesEnterRoom', function() {
            console.log('succesEnterRoom');
        });

        //全プレイヤーの入室処理が完了した時に呼び出させる処理
        socket.on("gameStart", function(data) {
            var statusArray = {};
            for (var uid in data) {
                statusArray[uid] = data[uid].status;
            }
            Game.changeBattleScene({
                userId : userId,
                statusArray : statusArray
            });
            socket.emit('command', {
                method : 'ready'
            });

            Game.battleScene.onCommand(function(command) {
                socket.emit('command', command);
            });
        });

        socket.on('resp', function(data) {
            var phase = data.phase;
            switch(phase) {
                case 'wait':
                    Game.battleScene.doWaitPhase(data);
                    break;
                case 'atackCommand':
                    Game.battleScene.doAtackCommandPhase(data);
                    break;
                case 'charge':
                    Game.battleScene.doChargePhase(data);
                    break;
                case 'defenthCommand':
                    Game.battleScene.doDefenthCommandPhase(data);
                    break;
                case 'damage':
                    Game.battleScene.doDamagePhase(data);
                    break;
            }
        });
    };
};