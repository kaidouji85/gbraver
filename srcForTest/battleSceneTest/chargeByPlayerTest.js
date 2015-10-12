var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');

enchant();
window.onload = doTest;

function doTest() {
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

    function waitPhase() {
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'test001@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        }; 

        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(sendCommandForWaitPhase);
    }
    
    function sendCommandForWaitPhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message, 'command', 'ウェイトフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'ウェイトフェイズ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(atackCommandPhase);
    }
    
    function atackCommandPhase() {
        var atackCommand = {
            phase : 'atackCommand',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        }; 
        
        Game.emitServerResp('resp',atackCommand);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        selectCommand();
    }

    function selectCommand() {
        assert.deepEqual(Game.currentScene.chargeIcon.getPict(),Game.assets[Game.PICT_BUTTON],'チャージボタンが通常の色である')
        testUtil.touch(Game.currentScene.chargeIcon);
        Game.onSendMessage(sendCommandForAttackCommandPhase);
    }
    
    function sendCommandForAttackCommandPhase(message,data){
        var expect = {
            method : 'charge'
        };
        assert.equal(message,'command','チャージ選択時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'チャージ選択時のサーバ送信パラメータが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,1,'プレイヤーキャラのポーズが「攻撃」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(chargePhase);
        //chargePhase();
    }

    function chargePhase() {
        var chargeData = {
            phase : 'charge',
            statusArray : {
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 0,
                    skillPoint : 1,
                    overHeatFlag : true
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.emitServerResp('resp',chargeData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        Game.onSendMessage(sendCommandForChargePhase);
    } 
    
    function sendCommandForChargePhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message, 'command', 'チャージ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'チャージ終了時のサーバ送信データが正しい');
        assert.equal(Game.currentScene.charaSpriteArray['test001@gmail.com'].frame,0,'プレイヤーキャラのポーズが「立ち」である');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(finishTest);
    }
}
