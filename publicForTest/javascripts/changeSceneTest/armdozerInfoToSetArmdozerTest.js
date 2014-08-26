enchant();
window.onload = setArmdozerToArmdozerInfoTest;

function setArmdozerToArmdozerInfoTest(){
    var assert = chai.assert;
    var Game;
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
            userId : 'test001@gmail.com',
            armdozerPict : 'Landozer.PNG'
        });
        Game.start();
        Game.onload = function(){
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
        Game.currentScene.tl.delay(60).then(function(){
            doServerResp();
        });
    }

    function doServerResp(){
        Game.onSendMessage(function(message,data){
            assert.equal(message,'getCharacterList','サーバ送信メッセージが正しい');
            assert.equal(data,null,'サーバ送信データが正しい');
        });
        Game.emitServerResp('successSetArmdozer',null);
        changeSetArndozerScene();
    }

    function changeSetArndozerScene(){
        var data = [
            {
                name:'グランブレイバー',
                id : 'granBraver'
            },
            {
                name:'ランドーザ',
                id:'landozer'
            }
        ];
        Game.onChangeScene(assertOfChangeScene)
        Game.emitServerResp('successGetCharacterList',data);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'setArmdozer','アームドーザ選択画面に遷移する');
        assert.equal(Game.getArmdozerPict(),'GranBraver.PNG','アームドーザ画像がグランブレイバーに変更されている');
        finishTest();
    }
}
