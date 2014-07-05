var core;
var PICT_PREFIX = location.origin + '/images/';
var PICT_GRANBRAVER = PICT_PREFIX + 'GranBraver.PNG';
var PICT_LANDOZER = PICT_PREFIX + 'Landozer.PNG';

enchant();
window.onload = function() {
    core = new Core(320, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_GRANBRAVER);
    core.preload(PICT_LANDOZER);
    core.start();
    core.onload = hitMotionDebug;
};

function hitMotionDebug(){
    var player = ArmdozerSprite({
        pict : core.assets[PICT_GRANBRAVER],
        direction : 'right'
    });
    var enemy = ArmdozerSprite({
        pict : core.assets[PICT_LANDOZER],
        direction : 'left'
    });

    //プレイヤーの攻撃
    //core.rootScene.addChild(enemy);
    //core.rootScene.addChild(player);
    //player.doAttackMotion();
    //enemy.doHitMotion();

    //敵の攻撃
    core.rootScene.addChild(player);
    core.rootScene.addChild(enemy);
    player.doHitMotion();
    enemy.doAttackMotion();
    core.rootScene.tl.delay(120).then(function(){
        player.doStandMotion();
        enemy.doStandMotion();
    });

}