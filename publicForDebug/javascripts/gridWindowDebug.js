enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = gridWindowDebug;
}

function gridWindowDebug(){
    var testWindow1 = gridWindow({
        pict : Game.assets[Game.PICT_WINDOW],
        width : 16,
        height : 8
    });
    testWindow1.x = 30;
    testWindow1.y = 30;
    Game.currentScene.addChild(testWindow1);

    var testWindow2 = gridWindow({
        pict : Game.assets[Game.PICT_WINDOW],
        width : 3,
        height : 3
    });
    testWindow2.x = 30;
    testWindow2.y = 200;
    testWindow2.setVisible(false);
    testWindow2.setVisible(true);
    Game.currentScene.addChild(testWindow2);

    var testWindow3 = gridWindow({
        pict : Game.assets[Game.PICT_WINDOW],
        width : 3,
        height : 3
    });
    testWindow3.x = 100;
    testWindow3.y = 200;
    testWindow3.setPict(Game.assets[Game.PICT_ACTIVE_WINDOW]);
    Game.currentScene.addChild(testWindow3);

    Game.currentScene.backgroundColor = 'black';
}