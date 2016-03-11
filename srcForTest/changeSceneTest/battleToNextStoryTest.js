var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var testScenarioData = require('../testlib/testScenarioData');
var game = require('../../src/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var testScenario = testScenarioData().getMasterData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'saikyou@gmail.com' : testDataInst.getPlayerData('saikyou@gmail.com').status
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'saikyou@gmail.com',
            armdozerId : 'landozer',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData(),
            scenarioData : testScenario
        });
        Game.start();
        Game.onload = setBattleMode;
    }

    function setBattleMode() {
        Game.setBattleMode('story');
        Game.setNextScenarioId('activeRightPilotTest');
        Game.changeBattleScene({
            statusArray : statusArray
        });
        waitPhase();
    }

    function waitPhase(){
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'saikyou@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'saikyou@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        Game.ee.once('sendMessage', function(message,data){
            atackCommandPhase();
        });
    }

    function atackCommandPhase(){
        var atackCommandPhaseData = {
            phase : 'atackCommand',
            statusArray : {
                'saikyou@gmail.com' : {
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
        testUtil.touch(Game.currentScene.atackIcon);
        testUtil.touch(Game.currentScene.plusIcon);
        testUtil.touch(Game.currentScene.plusIcon);
        testUtil.touch(Game.currentScene.okIcon);
        Game.ee.once('sendMessage', function(message,data){
            defenthCommandPhase();
        });
    }

    function defenthCommandPhase(){
        var defenthCommandData = {
            phase : 'defenthCommand',
            statusArray : {
                'saikyou@gmail.com' : {
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
        Game.emitServerResp('resp',defenthCommandData);
        Game.ee.once('sendMessage', function(message,data){
            //message,dataはplayerAtackTestで確認済み
            damagePhase();
        });
    }

    function damagePhase(){
        var damagePhaseData = {
            phase : 'damage',
            hit : 1,
            damage : 5000,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                'saikyou@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.emitServerResp('resp',damagePhaseData);
        Game.ee.once('sendMessage', function(message,data){
            //message,dataはplayerAtackTestで確認済み
            Game.currentScene.tl.delay(30).then(gameEnd);
        });
    }

    function gameEnd(){
        var gameEndData = {
            phase : 'gameEnd',
            winner : 'saikyou@gmail.com',
            statusArray : {
                'saikyou@gmail.com' : {
                    hp : 3200,
                    battery : 2,
                    active : 0,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.emitServerResp('resp',gameEndData);
        Game.ee.once('sendMessage', assertOfGameEnd);
    }

    function assertOfGameEnd(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message,'command','ゲーム終了時のサーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'ゲーム終了時のサーバ送信データが正しい');
        Game.currentScene.tl.delay(30).then(doDissolveRoom);
    }

    function doDissolveRoom(){
        Game.emitServerResp('dissolveRoom',null);
        assert.equal(Game.currentScene.battleEndIcon.getVisible(),true,'戦闘終了ボタンが表示されている');
        Game.currentScene.tl.delay(30).then(pushBattleEndIcon);
    }

    function pushBattleEndIcon(){
        Game.ee.once('changeScene', assertOfChangeScene);
        testUtil.touch(Game.currentScene.battleEndIcon);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'storyScene','ストーリー画面へ遷移する');
        assert.equal(Game.getScenarioId(),'activeRightPilotTest','ストーリーIDが正しい');
        testUtil.finishTest();
    }
}