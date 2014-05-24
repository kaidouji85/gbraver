//TODO : GameクラスのbattleSceneではなく、battleScene単体でデバッグしたい。
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
    assert = chai.assert;
    firstPlayerAtack_asDefenther();
};

/**
 * 敵が攻撃を選択する
 */
function firstPlayerAtack_asDefenther(){
    var Game = game({
        userId : '2'});
    Game.start();
    Game.onload = function(){
        Game.changeBattleScene({
            statusArray : gbraverDebug.statusArray,
            userId : '2'            
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
        Game.battleScene.doWaitPhase(waitPhaseData); 
        Game.battleScene.onCommand(atackCommandPhase);
    }
    
    function atackCommandPhase(command){
        var data = {
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
        Game.battleScene.doAtackCommandPhase(data);
        Game.battleScene.onCommand(defenthCommandPhase);
    }
    

    function defenthCommandPhase(command) {
        var expect = {
            method : 'ok'
        };
        assert.deepEqual(command, expect, '攻撃コマンドフェイズのコマンドが正しい');

        var data = {
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
        Game.battleScene.doDefenthCommandPhase(data);
        selectCommnad();
    }
    
    function selectCommnad(){
        Game.battleScene.onCommand(damagePhase);

        Game.battleScene.tl.delay(60).then(function() {
            Game.battleScene.plusBattery();
        }).delay(20).then(function() {
            Game.battleScene.selectBattery();
        });
  
    }
    
    function damagePhase(command) {
        var expect = {

            method : 'defenth',
            param : {
                battery : 2
            }
        };
        assert.deepEqual(command, expect, '防御コマンドフェイズのコマンドが正しい');

        var data = {
            phase : 'damage',
            hit : 1,
            damage : 1600,
            atackBattery : 3,
            defenthBattery : 2,
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 2,
                    active : 0
                },
                2 : {
                    hp : 3100,
                    battery : 3,
                    active : 3000
                }
            }
        };
        Game.battleScene.doDamagePhase(data);
        Game.battleScene.onCommand(waitPhase2);
    }

    function waitPhase2(command){
        var expect = {
            method : 'ok'
        };
        assert.deepEqual(command, expect, 'ウェイトフェイズ2のコマンドが正しい');

        var data = {
            phase : 'wait',
            atackUserId : '2',
            turn : 14,
            statusArray : {
                1 : {
                    hp : 3200,
                    battery : 2,
                    active : 3500
                },
                2 : {
                    hp : 3100,
                    battery : 4,
                    active : 5100
                }
            }
        };
        Game.battleScene.doWaitPhase(data);
        Game.battleScene.onCommand(function(command) {
            console.log('finish');
            $('title').text('finish');
        });
    }
}