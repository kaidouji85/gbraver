enchant();
var gbraverDebug = {};
var assert;

window.onload = function(){
    assert = chai.assert;
    var Game = game();
    Game.start();
    Game.onload = function(){
        Game.changeRoomSelectScene({
            userId : 'test001@gmail.com'
        });
        
        Game.onEnterRoom(function(roomId){
            console.log('room id is '+roomId);
        });
    };
};
