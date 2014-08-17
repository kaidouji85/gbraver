enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = scrollBackGroundDebug;
}

function scrollBackGroundDebug(){
    var sky = scrollBackGround({
        pict : Game.assets[Game.PICT_BG_SKY],
        speed : 0.1,
        height : 220
    });
    Game.currentScene.addChild(sky);

    var ground = scrollBackGround({
        pict : Game.assets[Game.PICT_BG_GROUND],
        speed : 0.6,
        height : 320
    });
    ground.y = 220;
    Game.currentScene.addChild(ground);

    Game.currentScene.backgroundColor = 'black';
}