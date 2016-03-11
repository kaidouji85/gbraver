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
            userId : 'test002@gmail.com',
            armdozerPict : 'Landozer.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeBattleScene({
                timeOver : 5,
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
        Game.ee.emit('serverResp', 'resp',waitPhaseData);
        Game.ee.once('sendMessage', function(message,data){
            //message、dataはenemyChargeTestで確認済み
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
        Game.ee.emit('serverResp', 'resp',data);
        Game.ee.once('sendMessage', defenthCommandPhase);
    }

    function defenthCommandPhase() {
        var data = {
            phase : 'defenthCommand',
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
        Game.ee.emit('serverResp', 'resp',data);
        selectCommnad();
    }

    function selectCommnad(){
        Game.ee.once('sendMessage', sendCommandForDefenseCommand);
        testUtil.touch(Game.currentScene.okIcon);
    }

    function sendCommandForDefenseCommand(){
        assert.equal(Game.currentScene.playerTurnTimer.getVisible(),false,'ターンタイマーが表示されていない');
        Game.ee.once('sendMessage', function(){
            new Exception('メッセージ送信が2回呼ばれたのでエラー発生');
        });
        //3秒待つ
        Game.currentScene.tl.delay(120).then(function(){
            testUtil.finishTest();
        });
    }

}