enchant();
window.onload = roomSelectToBattle;

function roomSelectToBattle(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png',
            armdozerList : getArmdozerList(),
            pilotList : getPilotList()
        });
        Game.start();
        Game.onload = function(){
            var roomInfo = {
                '0' : [],
                '1' : [],
                '2' : ['test002@gmail.com'],
                '3' : [],
                '4' : []
            };
            Game.changeRoomSelectScene(roomInfo);
            //console.log('ルーム2で入室');
            touch(Game.roomSelectScene.enterRoomButtonArray[2]);
            Game.onSendMessage(assertSendMessage);
        };
    }

    function assertSendMessage(message,data){
        var expectData = {
            roomId : 2
        };
        assert.equal(message,'enterRoom','メッセージが正しい');
        assert.deepEqual(data,expectData,'入室メッセージのパラメータが正しい');
        successEnterRoom();
    }

    function successEnterRoom(){
        Game.emitServerResp('succesEnterRoom',{});
        gameStart();
    }


    function gameStart() {
        //TODO : データ構造が気持ち悪い。ユーザIDが重複しまくってる。サーバ側の修正も必要だから一筋縄ではいかない。
        var gameStartData = {
            'test001@gmail.com' : {
                userId : 'test001@gmail.com',
                status : getTestPlayerData('test001@gmail.com')
            },
            'test002@gmail.com' : {
                userId : 'test002@gmail.com',
                status : getTestPlayerData('test002@gmail.com')
            }
        };
        Game.onChangeScene(assertChangeScene);
        Game.emitServerResp('gameStart',gameStartData);
    }

    function assertChangeScene(scene) {
        assert.equal(scene, 'battle', '戦闘画面へ遷移する');
        Game.onSendMessage(assertSendMessage2);
    }

    function assertSendMessage2(message, data){
        var expectData = {
            method : 'ready'
        };
        assert.equal(message, 'command', 'サーバレスポンスメッセージが正しい');
        assert.deepEqual(data, expectData, 'メッセージオプションが正しい');
        finishTest();
    }
}