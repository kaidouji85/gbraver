enchant();
window.onload = topToSetArmdozer;

function topToSetArmdozer(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSetArmdozerButton();
        };
    }
    
    function pushSetArmdozerButton(){
        //console.log('アームドーザ選択ボタンを押す');
        touch(Game.currentScene.setArmdpzerButton);
        Game.onSendMessage(asertOfMessage);
    }

    function asertOfMessage(message,data) {
        assert.equal(message, 'getCharacterList', 'サーバ送信メッセージが正しい');
        assert.equal(data, null, 'サーバ送信データが正しい');
        assert.equal(Game.currentScene.battleRoomButton.getVisible(),false,'対戦ルーム入室ボタンが表示されない');
        assert.equal(Game.currentScene.setArmdpzerButton.getVisible(),false,'アームドーザ選択ボタンが表示されない');
        assert.equal(Game.currentScene.singlePlayButton.getVisible(),false,'シングルプレイボタンが表示されない');
        assert.equal(Game.currentScene.title.getVisible(),true,'画面タイトルが表示される。');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージウインドウのメッセージが正しい');
        Game.currentScene.tl.delay(60).then(function(){
            doServerResp();
        });
    }

    function doServerResp(){
        var serverResp = [
            {
                name:'グランブレイバー',
                id : 'granBraver'
            },
            {
                name:'ランドーザ',
                id:'landozer'
            },
            {
                name:'ゼロブレイバー',
                id:'zeroBraver'
            },
            {
                name:'バトルドーザ',
                id:'battleDozer'
            }
        ]
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('successGetCharacterList',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'setArmdozer','アームドーザ選択画面へ遷移する');
        finishTest();
    }
}