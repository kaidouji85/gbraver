enchant();
var Game;
var core;
window.onload = function() {
    core =
    Game = gameBase();
    Game.start();
    Game.onload = function(){
        Game.currentScene.backgroundColor = 'black';
        buttonDebug();
    }
}

function buttonDebug() {
    var testButton = pictButton({
        text : 'テストボタン',
        pict : Game.assets[Game.PICT_BULUE_BUTTON]
    });
    testButton.x = 100;
    testButton.y = 50;
    testButton.addEventListener(Event.TOUCH_END,function(e){
        alert('test');
    })
    Game.currentScene.addChild(testButton);

}