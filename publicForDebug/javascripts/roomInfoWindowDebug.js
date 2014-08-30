enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = roomInfoWindowDebug;
}

function roomInfoWindowDebug(){
    var testRoomInfoWindow1 = roomInfoWindow({
        pict : Game.assets[Game.PICT_WINDOW]
    });
    testRoomInfoWindow1.x = 16;
    testRoomInfoWindow1.y = 8;
    testRoomInfoWindow1.setRoomName('ルーム0');
    testRoomInfoWindow1.setStatus('対戦相手募集中');
    testRoomInfoWindow1.setUsers(['test001@gmail.com']);
    testRoomInfoWindow1.addEventListener(Event.TOUCH_END,function(){
        alert('ルーム0を押した。');
    })
    Game.currentScene.addChild(testRoomInfoWindow1);

    var testRoomInfoWindow2 = roomInfoWindow({
        pict : Game.assets[Game.PICT_WINDOW]
    });
    testRoomInfoWindow2.x = 16;
    testRoomInfoWindow2.y = 80;
    testRoomInfoWindow2.setRoomName('ルーム1');
    testRoomInfoWindow2.setStatus('対戦中');
    testRoomInfoWindow2.setUsers(['test003@gmail.com','test004@gmail.com']);
    Game.currentScene.addChild(testRoomInfoWindow2);

    var testRoomInfoWindow3 = roomInfoWindow({
        pict : Game.assets[Game.PICT_WINDOW]
    });
    testRoomInfoWindow3.x = 16;
    testRoomInfoWindow3.y = 152;
    testRoomInfoWindow3.setRoomName('ルーム2');
    testRoomInfoWindow3.setStatus('空き');
    Game.currentScene.addChild(testRoomInfoWindow3);

    var testRoomInfoWindow4 = roomInfoWindow({
        pict : Game.assets[Game.PICT_WINDOW]
    });
    testRoomInfoWindow4.x = 16;
    testRoomInfoWindow4.y = 224;
    testRoomInfoWindow4.setRoomName('ルーム3');
    testRoomInfoWindow4.setStatus('空き');
    Game.currentScene.addChild(testRoomInfoWindow4);

    var testRoomInfoWindow5 = roomInfoWindow({
        pict : Game.assets[Game.PICT_WINDOW]
    });
    testRoomInfoWindow5.x = 16;
    testRoomInfoWindow5.y = 296;
    testRoomInfoWindow5.setRoomName('ルーム4');
    testRoomInfoWindow5.setStatus('空き');
    Game.currentScene.addChild(testRoomInfoWindow5);

    Game.currentScene.backgroundColor = 'black';
}