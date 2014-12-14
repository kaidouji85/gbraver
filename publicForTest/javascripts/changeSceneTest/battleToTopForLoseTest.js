enchant();
window.onload = battleToTop_lose;

function battleToTop_lose(){
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
            userId : 'test002@gmail.com',
            armdozerId : 'landozer',
            pilotId : 'kyoko',
            armdozerList : testDataInst.getMasterData().armdozerList,
            pilotList : testDataInst.getMasterData().pilotList,
            stageData : testDataInst.getStageData()
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
            atackUserId : 'saikyou@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1
                },
                'saikyou@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(function(message,data){
            //message,dataはenemyAtackTestで確認済み
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
        Game.onSendMessage(function(message,data){
            //message,dataはenemyAtackTestで確認済み
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
        selectCommand();
    }

    function selectCommand(){
        touch(Game.battleScene.plusIcon);
        touch(Game.battleScene.okIcon);

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
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1
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
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000,
                    skillPoint : 1
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
        Game.onChangeScene(function(scene){
            assert.equal(scene,'top','トップ画面へ遷移する');
            finishTest();
        });
        Game.emitServerResp('dissolveRoom',null);
    }
}