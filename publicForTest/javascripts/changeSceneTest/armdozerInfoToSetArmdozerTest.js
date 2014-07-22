enchant();
window.onload = setArmdozerToArmdozerInfoTest;

function setArmdozerToArmdozerInfoTest(){
    var assert = chai.assert;
    var Game;
    var armdozerIdList = [
        {
            name:'グランブレイバー',
            id : 'granBraver'
        },
        {
            name:'ランドーザ',
            id:'landozer'
        }
    ];
    var setArmdozerData = {
        armdozerIdList :armdozerIdList
    }
    var armdozerInfo = {
        armdozerId : 'granBraver',
        name : 'グランブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3000,
        speed : 110,
        weapons : {
            1 : {
                name : 'バスターナックル',
                power : 1000
            },
            2 : {
                name : 'バスターナックル',
                power : 1200
            },
            3 : {
                name : 'バスターナックル',
                power : 1500
            },
            4 : {
                name : 'バスターナックル',
                power : 1700
            },
            5 : {
                name : 'バスターナックル',
                power : 2000
            }
        }
    };
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeSetArmdozerScene(setArmdozerData);
            Game.changeArmdozerInfoScene(armdozerInfo);
            pushOkButton();
        };
    }

    function pushOkButton(){
        touch(Game.currentScene.okButton);
        Game.onSendMessage(assertOfMessage);
    }

    function assertOfMessage(message,data){
        var expectData = {
            armdozerId : 'granBraver'
        };
        assert.equal(message,'setArmdozer','サーバ送信メッセージが正しい');
        assert.deepEqual(data,expectData,'サーバ送信データが正しい');
        doServerResp();
    }

    function doServerResp(){
        Game.onChangeScene(function(scene){
            assert.equal(scene, 'setArmdozer', 'アームドーザセット画面へ遷移する');
            finishTest();
        });
        Game.emitServerResp('successSetArmdozer',null);
    }
}
