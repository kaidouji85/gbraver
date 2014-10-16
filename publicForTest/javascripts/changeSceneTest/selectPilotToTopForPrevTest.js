enchant();
window.onload = topToRoomSelect;

function topToRoomSelect(){
    var assert = chai.assert;
    var Game;
    var pilotList = [
        {
            id : 'kyoko',
            name : '恭子',
            pict : 'kyoko.png',
            shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
            type : 'quickCharge',
            battery : 3
        },
        {
            id : 'akane',
            name : '茜',
            pict : 'akane.png',
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'quickCharge',
            battery : 3
        },
        {
            id : 'iori',
            name: '伊織',
            pict: 'iori.png',
            shout: 'この一撃に、全てを掛ける！！',
            type: 'quickCharge',
            battery: 3
        }
    ];
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG',
            pilotPict : 'kyoko.png',
            pilotList : pilotList
        });
        Game.start();
        Game.onload = function(){
            Game.changeSelectPilotScene();
            pushPrevtButton();
        };
    }

    function pushPrevtButton(){
        Game.onChangeScene(assertOfChangeScene);
        touch(Game.currentScene.prevButton);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'top','トップシーンに遷移する');
        finishTest();
    }
}