enchant();
var gbraverDebug = {};
var assert;

/**
 * テストデータ
 */
gbraverDebug.statusArray = {
    2 : {
        name : 'ランドーザ',
        pictName : 'Landozer.PNG',
        hp : 4700,
        speed : 150,
        active : 0,
        battery : 5,
        weapons : {
            1 : {
                name : 'ブレイクパンチ',
                power : 1200
            },
            2 : {
                name : 'ブレイクパンチ',
                power : 1700
            },
            3 : {
                name : 'ブレイクパンチ',
                power : 2300
            },
            4 : {
                name : 'ブレイクパンチ',
                power : 2900
            },
            5 : {
                name : 'ブレイクパンチ',
                power : 3800
            }
        }
    },
    1 : {
        name : '最強ブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 250,
        active : 0,
        battery : 5,
        weapons : {
            1 : {
                name : 'バスターナックル',
                power : 5000
            },
            2 : {
                name : 'バスターナックル',
                power : 5000
            },
            3 : {
                name : 'バスターナックル',
                power : 5000
            },
            4 : {
                name : 'バスターナックル',
                power : 5000
            },
            5 : {
                name : 'バスターナックル',
                power : 5000
            }
        }
    }
};

window.onload = function(){
    assert = chai.assert;
    battleToTop_win();
};

function battleToTop_win(){
    var Game = game({
        userId : '1'});
    Game.start();
    Game.onload = function(){
        Game.changeBattleScene({
            statusArray : gbraverDebug.statusArray,
            userId : '1'
        });
        waitPhase();
    };

    function waitPhase(){
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : '1',
            turn : 20,
            statusArray : {
                2 : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                },
                1 : {
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
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                },
                2 : {
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
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                },
                2 : {
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
                1 : {
                    hp : 3200,
                    battery : 2,
                    active : 0
                },
                2 : {
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
            winner : '1',
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 2,
                    active : 0
                },
                2 : {
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
            console.log('finish');
            $('title').text('finish');
        });
        Game.emitServerResp('dissolveRoom',null);
    }
}