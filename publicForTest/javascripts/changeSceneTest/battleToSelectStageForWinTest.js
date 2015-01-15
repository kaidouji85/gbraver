//シングルプレイの場合、バトル終了後はルーム選択画面に遷移する
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
            stageData : testDataInst.getStageData()
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
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(function(message,data){
            //message,dataはplayerChargeTestで確認済み
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
        touch(Game.battleScene.atackIcon);
        touch(Game.battleScene.plusIcon);
        touch(Game.battleScene.plusIcon);
        touch(Game.battleScene.okIcon);

        Game.onSendMessage(function(message,data){
            //message,dataはplayerAtackTestで確認済み
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
        Game.onSendMessage(function(message,data){
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
        Game.onSendMessage(function(message,data){
            //message,dataはplayerAtackTestで確認済み
            gameEnd();
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
        Game.onSendMessage(assertOfGameEnd);
    }

    function assertOfGameEnd(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message,'command','ゲーム終了時のサーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'ゲーム終了時のサーバ送信データが正しい');
        doDissolveRoom();
    }

    function doDissolveRoom(){
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('dissolveRoom',null);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'selectStage','ルーム選択画面へ遷移する');
        finishTest();
    }

}