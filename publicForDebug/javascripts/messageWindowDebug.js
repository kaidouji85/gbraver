enchant();
var Game;

window.onload = function() {
    Game = gameBase();
    Game.start();
    Game.onload = messageWindowDebug;
}

function messageWindowDebug(){
    Game.currentScene.backgroundColor = 'black';

    var msWin = messageWindow({
        pict : Game.assets[Game.PICT_MESSAGE_WINDOW]
    });
    msWin.setText('テストですよ');
    Game.currentScene.addChild(msWin);

    var msWin2 = messageWindow({
        pict : Game.assets[Game.PICT_MESSAGE_WINDOW]
    });
    msWin2.x = 0;
    msWin2.y = 100;
    msWin2.setText('テストその２');
    msWin2.setVisible(false);
    Game.currentScene.addChild(msWin2);

}