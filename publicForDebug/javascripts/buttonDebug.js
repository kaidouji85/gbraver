enchant();
var Game;
var assert;
window.onload = function() {
    assert = chai.assert;
    Game = gameBase();
    Game.start();
    Game.onload = function(){
        Game.currentScene.backgroundColor = 'black';
        buttonDebug();
    }
}

function buttonDebug() {
    var testButton1 = pictButton({
        text : 'テストボタン',
        pict : Game.assets[Game.PICT_BULUE_BUTTON]
    });
    testButton1.x = 100;
    testButton1.y = 50;
    testButton1.addEventListener(Event.TOUCH_END,function(e){
        alert('test1');
    })
    assert.equal(testButton1.getVisible(),true,'getVisible()が正しい');
    Game.currentScene.addChild(testButton1);

    var testButton2 = pictButton({
        text : 'ぼたん',
        pict : Game.assets[Game.PICT_BULUE_BUTTON]
    });
    testButton2.x = 100;
    testButton2.y = 90;
    testButton2.addEventListener(Event.TOUCH_END,function(e){
        alert('test2');
    })
    testButton2.setVisible(false);
    assert.equal(testButton2.getVisible(),false,'getVisible()が正しい');
    Game.currentScene.addChild(testButton2);

}