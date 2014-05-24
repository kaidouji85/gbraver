//TODO : GameクラスのroomSelectSceneではなく、roomSelectScene単体でデバッグしたい。
enchant();
var gbraverDebug = {};
var assert;

//テストデータ
gbraverDebug.statusArray = {
    'test002@gmail.com' : {
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
    'test001@gmail.com' : {
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
    enterRoomAndGameStart();
};

function enterRoomAndGameStart(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeRoomSelectScene();
        enterRoom();
    };
    
    function enterRoom(){
        console.log('2番の部屋に入室する');
        Game.roomSelectScene.tl.delay(60).then(function(){
            Game.roomSelectScene.pushEnterRoom(2);
        });
        
        Game.roomSelectScene.onEnterRoom(function(data){
            var expect = {
                roomId : 2
            };
            assert.deepEqual(expect,data,'入室コールバック関数が返す入室情報が正しい');
            Game.roomSelectScene.tl.delay(60).then(changeBattleScene);
        });
    }

    function changeBattleScene() {
        Game.changeBattleScene({
            statusArray : gbraverDebug.statusArray,
            userId : 'test001@gmail.com'
        });
        waitPhase();
    }
    
    function waitPhase() {
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'test001@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                }
            }
        }; 

        Game.battleScene.doWaitPhase(waitPhaseData);
        Game.battleScene.onCommand(function(command){
            var expect = {
                method : 'ok'
            };
            assert.deepEqual(command, expect, 'ウェイトフェイズ終了時のコマンド送信が正しい');
            console.log('finish');
            $('title').text('finish');
        });
    }
}
