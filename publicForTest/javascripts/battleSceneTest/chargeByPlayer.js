enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = chargeByPlayer;

function chargeByPlayer() {
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeBattleScene({
                statusArray : statusArray
            });
            waitPhase();
        };
    }

    function waitPhase() {
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
        var expect = {
            method : 'ok'
        };
        assert.equal(message, 'command', 'ウェイトフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'ウェイトフェイズ終了時のサーバ送信データが正しい');
        atackCommandPhase();
    }
    
    function atackCommandPhase() {
        var atackCommand = {
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
        
        Game.emitServerResp('resp',atackCommand);
        selectCommand();
    }

    function selectCommand() {
        touch(Game.currentScene.chargeIcon);
        Game.onSendMessage(assertAtackCommandPhase);
    }
    
    function assertAtackCommandPhase(message,data){
        var expect = {
            method : 'charge'
        };
        assert.equal(message,'command','チャージ選択時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'チャージ選択時のサーバ送信パラメータが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'プレイヤーキャラのポーズが「攻撃」である');
        chargePhase();        
    }

    function chargePhase() {
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
        Game.onSendMessage(assertChargePhase);
    } 
    
    function assertChargePhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message, 'command', 'チャージ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'チャージ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'プレイヤーキャラのポーズが「立ち」である');
        finishTest();
    }
}