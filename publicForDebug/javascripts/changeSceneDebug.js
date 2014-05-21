enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    //topToRoomSelect();
    //topToSetArmdozer();
    setArmdozerToTop();
};

function topToRoomSelect(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('対戦ルーム入室ボタンを押す');
        Game.onChangeScene(function(scene){
            assert.equal(scene,'selectRoom','ルーム選択画面へ遷移する');
        });
    };    
}

function topToSetArmdozer(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('アームドーザ選択ボタンを押す');
        Game.onChangeScene(function(scene){
            assert.equal(scene,'setArmdozer','ルーム選択画面へ遷移する');
        });
    };    
}

function setArmdozerToTop(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene();
        console.log('ランドーザボタンを押す');
        Game.onSendMessage(function(message,data){
            var expectData = {
                armdozerId : 'landozer'
            };
            assert.equal(message,'setArmdozer','サーバへ送信するメッセージが正しい');
            assert.deepEqual(data,expectData,'サーバへ送信するデータが正しい');
            
            Game.onChangeScene(function(scene){
                assert.equal(scene,'top','トップ画面へ遷移する');
                console.log('finish');
                $('title').text('finish');
            });
            Game.emitServerResp('successSetArmdozer',{});      

        });
    };      
}
