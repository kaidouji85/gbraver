var testData = require('../../testlib/testData');
var testUtil = require('../../testlib/testUtil');
var game = require('../../../src/game/game');

enchant();
window.onload = doTest;

function doTest(){
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
                statusArray : statusArray,
                timeOver : 5
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
        Game.emitServerResp('resp',atackCommandPhaseData);
        selectCommand();
    }

    function selectCommand(){
        Game.onSendMessage(sendCommandForAttackCommand);
        testUtil.touch(Game.currentScene.atackIcon);
        testUtil.touch(Game.currentScene.plusIcon);
        testUtil.touch(Game.currentScene.plusIcon);
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
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'対戦相手がコマンドを選択中......','メッセージが正しい');
        testUtil.finishTest();
    }
}