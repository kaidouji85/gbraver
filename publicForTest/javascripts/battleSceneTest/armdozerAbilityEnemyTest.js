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
            armdozerPict : 'GranBraver.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeBattleScene({
                statusArray : statusArray
            });
            armdozerAbilityPhase();
        };
    }

    function armdozerAbilityPhase(){
        var data = {
            phase: 'armdozerAbility',
            playerId: 'test002@gmail.com',
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test001@gmail.com' : {
                    hp : 1000,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.onSendMessage(assertOfArmdozerAbilityPhase);
        Game.emitServerResp('resp',data);
    }

    function assertOfArmdozerAbilityPhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','サーバ送信メッセージが正しい');
        assert.deepEqual(expect,data,'サーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        finishTest();
    }
}