enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackByEnemy;

function attackByEnemy(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
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
            //message、dataはenemyChargeTestで確認済み
            assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
            assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
            Game.currentScene.tl.delay(30).then(atackCommandPhase);
        });
    }
    
    function atackCommandPhase(){
        var data = {
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
        Game.emitServerResp('resp',data);
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.onSendMessage(sendCommandForAttackCommand);
    }
    
    function sendCommandForAttackCommand(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', '攻撃コマンドフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, '攻撃コマンドフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'敵キャラのポーズが「攻撃」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(defenthCommandPhase);
    }

    function defenthCommandPhase() {
        var data = {
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
        Game.emitServerResp('resp',data);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        selectCommnad();
    }
    
    function selectCommnad(){
        Game.onSendMessage(sendCommandForDefenseCommand);
        touch(Game.currentScene.plusIcon);
        touch(Game.currentScene.okIcon);
    }
    
    function sendCommandForDefenseCommand(message,data){
        var expectData = {
            method : 'defenth',
            param : {
                battery : 2
            }
        };
        assert.equal(message,'command','防御コマンドフェイズのサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, '防御コマンドフェイズのサーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
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
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', 'サーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, 'ウェイトフェイズ2のコマンドが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'敵キャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.charaSpriteArray['test002@gmail.com'].frame,0,'プレイヤーキャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(waitPhase2);
    }

    function waitPhase2(){
        var data = {
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
        Game.emitServerResp('resp',data);
        Game.onSendMessage(function(message,command) {
            assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
            assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
            finishTest();
        });
    }
}