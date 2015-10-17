var testUtil = require('../testlib/testUtil');
var game = require('../../src/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = initRoomSelectScene;
    }

    function initRoomSelectScene() {
        var roomInfo = {
            '0' : [],
            '1' : ['test001@gmail.com','test002@gmail.com'],
            '2' : ['test003@gmail.com'],
            '3' : [],
            '4' : []
        };
        Game.changeRoomSelectScene(roomInfo);
        assertOfBgm();
    }

    function assertOfBgm(){
        assert.equal(Game.bgm.getBgm(),null,'BGなしに設定されている');
        testUtil.finishTest();
    }

}
