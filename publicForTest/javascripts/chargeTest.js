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
        name : 'グランブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 250,
        active : 0,
        battery : 5,
        weapons : {
            1 : {
                name : 'バスターナックル',
                power : 800
            },
            2 : {
                name : 'バスターナックル',
                power : 1100
            },
            3 : {
                name : 'バスターナックル',
                power : 1600
            },
            4 : {
                name : 'バスターナックル',
                power : 2100
            },
            5 : {
                name : 'バスターナックル',
                power : 2800
            },
        }
    }
};

window.onload = function(){
    firstTurnPlayerCharge_asFirstTurnplayer();
};

/**
 * 先攻プレイヤーがチャージを選択する　＃先攻プレイヤー視点
 */
function firstTurnPlayerCharge_asFirstTurnplayer() {
    
    assert = chai.assert;
    var Game = game({
        statusArray : gbraverDebug.statusArray,
        userId : '1'
    });
    
    Game.start();
    Game.onReady(waitPhase);

    function waitPhase() {
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

        Game.doWaitPhase(waitPhaseData);
        Game.onCommand(function(command){
            var expect = {
                method : 'ok'
            };
            assert.deepEqual(command, expect, 'ウェイトフェイズ終了時のコマンド送信が正しい');
            atackCommandPhase();
        });
    }
    
    function atackCommandPhase() {
        var atackCommand = {
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

        Game.doAtackCommandPhase(atackCommand);
        Game.rootScene.tl.delay(60).then(function(){
            Game.onCommand(selectCommand);
            Game.charge();
        });
    }

    function selectCommand(command) {
        var expect = {
            method : 'charge'
        };
        assert.deepEqual(command, expect, 'チャージ選択時のコマンド送信が正しい');
        chargePhase();
    }

    function chargePhase() {
        var charge = {
            phase : 'charge',
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 0
                },
                2 : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                }
            }
        };
        Game.doChargePhase(charge);
        Game.onCommand(function(command) {
            var expect = {
                method : 'ok'
            };
            assert.deepEqual(command, expect, 'チャージ終了時のコマンド送信が正しい');
            console.log('finish');
            $('title').text('Gブレイバー　チャージテスト finish');
        });
    } 
}
