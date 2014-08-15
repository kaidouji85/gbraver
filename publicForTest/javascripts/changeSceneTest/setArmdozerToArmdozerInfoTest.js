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
    var data = {
        armdozerIdList :armdozerIdList
    }
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeSetArmdozerScene(data);
            pushLAndozer();
        };
    }
    
    function pushLAndozer(){
        console.log('ランドーザボタンを押す');
        touch(Game.setArmdozerScene.armdozerButtonArray[1]);
        Game.onSendMessage(assertLoading);
    }

    function assertLoading(message,data){
        var expectData = {
            armdozerId : 'landozer'
        };
        assert.equal(message,'getCharacterInfo','messageが正しい');
        assert.deepEqual(data,expectData,'dataが正しい');
        assert.equal(Game.currentScene.armdozerButtonArray[0].getVisible(),false,'アームドーザ選択ボタン0が非表示である');
        assert.equal(Game.currentScene.armdozerButtonArray[1].getVisible(),false,'アームドーザ選択ボタン1が非表示である');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示である');

        Game.currentScene.tl.delay(60).then(function(){
            changeScene();
        });
    }

    function changeScene() {
        Game.onChangeScene(function (scene) {
            assert.equal(scene, 'armdozerInfo', 'アームドーザ情報画面へ遷移する');
            finishTest();
        });
        Game.emitServerResp('successGetCharacterInfo', {
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
        });
    }
}
