enchant();
var assert;

window.onload = function(){
    assert = chai.assert;
    //topToRoomSelect();
    topToSetArmdozer();
};

function topToRoomSelect(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('対戦ルーム入室ボタンを押す');
    };    
}

function topToSetArmdozer(){
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('アームドーザ選択ボタンを押す');
    };    
}
