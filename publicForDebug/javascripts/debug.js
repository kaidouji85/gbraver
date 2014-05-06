enchant();
var gbraverDebug = {};
var assert;
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

window.onload = function() {
    assert = chai.assert;
    //firstTurnPlayerCharge_asFirstTurnplayer();
    //firstTurnPlayerCharge_asSecondTurnplayer();
    firstPlayerAtack_asAtacker();
    //firstPlayerAtack_asDefenther();
};

/**
 * 先攻プレイヤーがチャージを選択する　＃先攻プレイヤー視点
 */
function firstTurnPlayerCharge_asFirstTurnplayer() {
    var Game = game();
    
    Game.start();
    Game.onload = function(){
        Game.changeBattleScene({
            statusArray : gbraverDebug.statusArray,
            userId : '1'
        });
        waitPhase();
    };

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
        
        console.log('チャージを選択する');
        Game.onCommand(selectCommand);
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
            $('title').text('finish');
        });
    } 
}

/**
 * 先攻プレイヤーがチャージを選択する　＃後攻プレイヤー視点
 */
function firstTurnPlayerCharge_asSecondTurnplayer() {
    var Game = game();
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
        Game.doWaitPhase(waitPhaseData);
        Game.onCommand(atackCommand);      
    }
    
    function atackCommand(command) {
        console.log(command);
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
        Game.doAtackCommandPhase(data);
        Game.onCommand(charge);
    }

    function charge(command) {
        console.log(command);
        var data = {
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
        Game.doChargePhase(data);
        Game.onCommand(function(command) {
            console.log('finish');
            $('title').text('finish');
        });
    }
}

/**
 * バッテリー3で攻撃して2で防御する #攻撃プレイヤー視点
 */
function firstPlayerAtack_asAtacker(){
    var Game = game();
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
        Game.doWaitPhase(waitPhaseData);
        Game.onCommand(atackCommandPhase);
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
        Game.doAtackCommandPhase(data);
        selectCommand();
    }
    
    function selectCommand(){
        Game.onCommand(defenthCommandPhase);
        console.log('3で攻撃する');
    }
    
    function defenthCommandPhase(command){
        var expect = {
            method : 'atack',
            param : {
                battery : 3
            }
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
        Game.doDefenthCommandPhase(data);
        Game.onCommand(damagePhase);
    }

    function damagePhase(command) {
        var expect = {
            method : 'ok'
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
        Game.doDamagePhase(data);
        Game.onCommand(waitPhase2);
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
        Game.doWaitPhase(data); 
        Game.onCommand(finish); 
    }
    
    function finish(command){
        console.log('finish');
        $('title').text('finish');
    }
}

/**
 * バッテリー3で攻撃して2で防御する #防御プレイヤー視点
 */
function firstPlayerAtack_asDefenther(){
    var Game = game();
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
        Game.doWaitPhase(waitPhaseData); 
        Game.onCommand(atackCommandPhase);
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
        Game.doAtackCommandPhase(data);
        Game.onCommand(defenthCommandPhase);
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
        Game.doDefenthCommandPhase(data);
        selectCommnad();
    }
    
    function selectCommnad(){
        Game.onCommand(damagePhase);
        console.log('2で防御する');
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
        Game.doDamagePhase(data);
        Game.onCommand(waitPhase2);
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
        Game.doWaitPhase(data);
        Game.onCommand(function(command) {
            console.log('finish');
            $('title').text('finish');
        });
    }
}