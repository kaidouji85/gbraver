enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = titleWindowDebug;
}

function titleWindowDebug(){
    var testWindow = titleWindow({
        pict : Game.assets[Game.PICT_WINDOW],
        text : 'テスト'
    });
    Game.currentScene.addChild(testWindow);
    Game.currentScene.backgroundColor = 'black';
}