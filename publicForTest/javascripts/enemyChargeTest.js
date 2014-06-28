enchant();
window.onload = firstTurnPlayerCharge_asSecondTurnplayer;

function firstTurnPlayerCharge_asSecondTurnplayer() {
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test002@gmail.com'
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
        Game.onSendMessage(assertWaitPhase);
    }
    
    function assertWaitPhase(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',ウェイトフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',ウェイトフェイズ終了時のサーバ送信データが正しい');
        atackCommand();
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
        Game.onSendMessage(assertAtackCommand);
    }
    
    function assertAtackCommand(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',攻撃コマンドフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',攻撃コマンドフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'敵キャラのポーズが「攻撃」である');
        charge();
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
        Game.onSendMessage(assertCharge);
    }
    
    function assertCharge(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',チャージフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',チャージフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'敵キャラのポーズが「立ち」である');
        finishTest();
    }
}