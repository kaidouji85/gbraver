enchant();
var gbraverDebug = {};
var assert;

window.onload = function(){
    assert = chai.assert;
    enterRoomAndGameStart();
};

function enterRoomAndGameStart(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeRoomSelectScene();
        enterRoom();
    };
    
    function enterRoom(){
        Game.roomSelectScene.tl.delay(60).then(function(){
            Game.roomSelectScene.pushEnterRoom(2);
        });
        Game.onSendMessage(assertEnterRoom);
    }
    
    function assertEnterRoom(message,data){
        var expect = {
            roomId : 2
        };
        assert.equal(message, 'enterRoom', '入室処理のサーバ送信メッセージ名が正しい');
        assert.deepEqual(expect, data, '入室処理のサーバ送信データが正しい');
        console.log('finish');
        $('title').text('finish');
    }
}
