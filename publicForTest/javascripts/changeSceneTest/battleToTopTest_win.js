enchant();
window.onload = battleToTop_win;

function battleToTop_win(){
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'saikyou@gmail.com' : getTestPlayerData('saikyou@gmail.com')
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'saikyou@gmail.com',
            armdozerPict : 'GranBraver.PNG'});
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
                    active : 3000
                },
                'saikyou@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
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
                    active : 5000
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
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
                    active : 5000
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
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
                    active : 0
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000
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
                    active : 0
                },
                'test002@gmail.com' : {
                    hp : -300,
                    battery : 3,
                    active : 3000
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