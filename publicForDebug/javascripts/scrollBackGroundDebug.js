enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = scrollBackGroundDebug;
}

function scrollBackGroundDebug(){
    var ground = scrollBackGround({
        pict : Game.assets[Game.PICT_BG_GROUND],
        speed : 2,
        height : 320
    });
    ground.y = 220;
    Game.currentScene.addChild(ground);

    Game.currentScene.backgroundColor = 'black';
}