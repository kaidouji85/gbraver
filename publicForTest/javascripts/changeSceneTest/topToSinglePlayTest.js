enchant();
window.onload = topToSetArmdozer;

function topToSetArmdozer(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko',
            armdozerList : getArmdozerList(),
            pilotList : getPilotList()
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSinglePlayButton();
        };
    }

    function pushSinglePlayButton(){
        touch(Game.currentScene.singlePlayButton);
        Game.onSendMessage(asertOfMessage);
    }

    function asertOfMessage(message,data) {
        var expectData = {
            enemyId : 'landozer',
            routineId : 'attack3'
        };
        assert.equal(message, 'startSinglePlay', 'サーバ送信メッセージが正しい');
        assert.deepEqual(data, expectData, 'サーバ送信データが正しい');
        assert.equal(Game.currentScene.battleRoomButton.getVisible(),false,'対戦ルーム入室ボタンが表示されない');
        assert.equal(Game.currentScene.selectArmdozerButton.getVisible(),false,'アームドーザ選択ボタンが表示されない');
        assert.equal(Game.currentScene.singlePlayButton.getVisible(),false,'シングルプレイボタンが表示されない');
        assert.equal(Game.currentScene.selectPilotButton.getVisible(),false,'パイロット選択ボタンが表示されない');
        assert.equal(Game.currentScene.title.getVisible(),true,'画面タイトルが表示される。');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージウインドウのメッセージが正しい');
        Game.currentScene.tl.delay(60).then(function(){
            doServerResp();
        });
    }

    function doServerResp(){
        var serverResp = {
            'test001@gmail.com' : {
                userId : 'test001@gmail.com',
                status : getTestPlayerData('test001@gmail.com')
            },
            'nonePlayerCharacter' : {
                userId : 'nonePlayerCharacter',
                status : getTestPlayerData('test002@gmail.com')
            }
        };
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('gameStart',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'battle','戦闘画面へ遷移する');
        Game.onSendMessage(finishTest);
    }
}