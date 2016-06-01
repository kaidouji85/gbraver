var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var game = require('../../../../client/game/game');

enchant();
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'saikyou@gmail.com' : testDataInst.getPlayerData('saikyou@gmail.com').status
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'saikyou@gmail.com',
            armdozerId : 'saikyouBraver',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
        });
        Game.start();
        Game.onload = function(){
            Game.setBattleMode('singlePlay');
            Game.changeBattleScene({
                statusArray : statusArray
            });
            waitPhase();
        };
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
        Game.ee.emit('serverResp', 'resp',waitPhaseData);
        Game.ee.once('sendMessage', function(message,data){
            //message,dataはplayerChargeTestで確認済み
            emitBattleError();
        });
    }

    function emitBattleError(){
        Game.ee.once('changeScene', assertOfChangeScene);
        Game.ee.emit('serverResp', 'battleError',null);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'top','トップシーンに繊維する');
        testUtil.finishTest();
    }
}