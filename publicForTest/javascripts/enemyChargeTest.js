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
    firstTurnPlayerCharge_asSecondTurnplayer();
};

function firstTurnPlayerCharge_asSecondTurnplayer() {
    var Game = game({
        userId : '2'
    });
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
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(assertWaitPhase);
    }
    
    function assertWaitPhase(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',ウェイトフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',ウェイトフェイズ終了時のサーバ送信データが正しい');
        atackCommand();
    }
    
    function atackCommand() {
        var atackCommandData = {
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
        Game.emitServerResp('resp',atackCommandData);
        Game.onSendMessage(assertAtackCommand);
    }
    
    function assertAtackCommand(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',攻撃コマンドフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',攻撃コマンドフェイズ終了時のサーバ送信データが正しい');
        charge();
    }

    function charge() {
        var chargeData = {
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
        Game.emitServerResp('resp',chargeData);
        Game.onSendMessage(assertCharge);
    }
    
    function assertCharge(message,data){
        var expectData = {
            method : 'ok'
        };
        assert.equal(message, 'command', ',チャージフェイズ終了時のサーバ送信メッセージ名が正しい');
        assert.deepEqual(data, expectData, ',チャージフェイズ終了時のサーバ送信データが正しい');
        console.log('finish');
        $('title').text('finish');
       
    }
}