enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackByPlayer;

function attackByPlayer(){
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG'
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
                    active : 3000,
                    skillPoint : 1
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(function(message,data){
            //message,dataはplayerChargeTestで確認済み
            assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
            assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
            Game.currentScene.tl.delay(30).then(atackCommandPhase);
        });
    }
    
    function atackCommandPhase(){
        var atackCommandPhaseData = {
            phase : 'atackCommand',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',atackCommandPhaseData);
        selectCommand();
    }
    
    function selectCommand(){
        touch(Game.currentScene.atackIcon);
        touch(Game.currentScene.plusIcon);
        touch(Game.currentScene.plusIcon);
        touch(Game.currentScene.okIcon);
        Game.onSendMessage(sendCommandForAttackCommand);
    }
    
    function sendCommandForAttackCommand(message,data){
        var expect = {
            method : 'atack',
            param : {
                battery : 3
            }
        };
        assert.equal(message,'command','攻撃コマンドフェイズのサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, '攻撃コマンドフェイズのサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'プレイヤーキャラのポーズが「攻撃」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(defenthCommandPhase);
    }
    
    function defenthCommandPhase(){
        var defenthCommandData = {
            phase : 'defenthCommand',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',defenthCommandData);
        Game.onSendMessage(sendCommandForDefenthCommandPhase);
    }
    
    function sendCommandForDefenthCommandPhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','防御コマンドフェイズのサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, '防御コマンドフェイズのサーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(damagePhase);
    }

    function damagePhase() {
        var damagePhaseData = {
            phase : 'damage',
            hit : 1,
            damage : 1600,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 3100,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',damagePhaseData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        Game.onSendMessage(sendCommandForDamagePhase);
    }
    
    function sendCommandForDamagePhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','ウェイトフェイズ2のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'ウェイトフェイズ2のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'プレイヤーキャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.charaSpriteArray['test002@gmail.com'].frame,0,'敵キャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(waitPhase2);
    }
    
    function waitPhase2(){
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'test002@gmail.com',
            turn : 14,
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 3500,
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 3100,
                    battery : 4,
                    active : 5100,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        Game.onSendMessage(function(){
            assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
            assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
            finishTest();
        });
    }


}