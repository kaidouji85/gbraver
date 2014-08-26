enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = chargeByEnemy;

function chargeByEnemy() {
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test002@gmail.com',
            armdozerPict : 'Landozer.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeBattleScene({
                statusArray : statusArray
            });
            waitPhase();
        };
    }
    
    function waitPhase(){
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'test001@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(sendCommandForWaitPhase);
    }
    
    function sendCommandForWaitPhase(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',ウェイトフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',ウェイトフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(atackCommand);
    }
    
    function atackCommand() {
        var atackCommandData = {
            phase : 'atackCommand',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                }
            }
        };
        Game.emitServerResp('resp',atackCommandData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.onSendMessage(sendCommandForAttackCommandPhase);
    }
    
    function sendCommandForAttackCommandPhase(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',攻撃コマンドフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',攻撃コマンドフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'敵キャラのポーズが「攻撃」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(charge);
    }

    function charge() {
        var chargeData = {
            phase : 'charge',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 0
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                }
            }
        };
        Game.emitServerResp('resp',chargeData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        Game.onSendMessage(sendCommandForChargePhase);
    }

    function sendCommandForChargePhase(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',チャージフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',チャージフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'敵キャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        finishTest();
    }
}