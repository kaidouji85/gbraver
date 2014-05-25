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
    firstPlayerAtack_asAtacker();
};

/**
 * プレイヤーが攻撃を選択する
 */
function firstPlayerAtack_asAtacker(){
    var Game = game({
        userId : '1'
    });
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
        Game.battleScene.tl.delay(60).then(function() {
            Game.battleScene.moveBatteryCommand();
        }).delay(20).then(function() {
            Game.battleScene.plusBattery();
        }).delay(20).then(function() {
            Game.battleScene.plusBattery();
        }).delay(20).then(function() {
            Game.battleScene.selectBattery();
        });
        
        Game.onSendMessage(assertAtackCommandPhase);
    }
    
    function assertAtackCommandPhase(message,data){
        var expect = {
            method : 'atack',
            param : {
                battery : 3
            }
        };
        assert.equal(message,'command','攻撃コマンドフェイズのサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, '攻撃コマンドフェイズのサーバ送信データが正しい');
        defenthCommandPhase();
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
        Game.onSendMessage(assertDefenthCommandPhase);
    }
    
    function assertDefenthCommandPhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','防御コマンドフェイズのサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, '防御コマンドフェイズのサーバ送信データが正しい');
        damagePhase();
    }

    function damagePhase() {
        var damagePhaseData = {
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
        
        Game.emitServerResp('resp',damagePhaseData);
        Game.onSendMessage(assertDamagePhase);
    }
    
    function assertDamagePhase(message,data){
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','ウェイトフェイズ2のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expect, 'ウェイトフェイズ2のサーバ送信データが正しい');
        waitPhase2();
    }
    
    function waitPhase2(){
        var waitPhaseData = {
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
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(finish);
    }
    
    function finish(message,data){
        console.log('finish');
        $('title').text('finish');
    }
}