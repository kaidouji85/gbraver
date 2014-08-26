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
            pushPrevButton();
        };
    }

    function pushPrevButton(){
        touch(Game.currentScene.prevButton);
        Game.onSendMessage(assertOfMessage);
    }

    function assertOfMessage(message,data){
        assert.equal(message,'getCharacterList','サーバ送信メッセージが正しい');
        assert.equal(data,null,'サーバ送信データが正しい');
        doServerResp();
    }

    function doServerResp(){
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
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('successGetCharacterList',data);
    }

    function assertOfChangeScene(scene) {
        assert.equal(scene,'setArmdozer','アームドーザ選択画面に遷移する');
        assert.equal(Game.getArmdozerPict(),'Landozer.PNG','アームドーザ画像がランドーザのままである');
        finishTest();
    }
}
