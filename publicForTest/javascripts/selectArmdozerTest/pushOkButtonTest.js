enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = doTest;

function doTest(){
    var assert = chai.assert;
    var Game = gameBase();
    var testScene;
    var armdozerList = [
        {
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
                    power : 1000
                },
                3 : {
                    name : 'バスターナックル',
                    power : 1000
                },
                4 : {
                    name : 'バスターナックル',
                    power : 1000
                },
                5 : {
                    name : 'バスターナックル',
                    power : 1000
                }
            }
        },
        {
            armdozerId : 'landozer',
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            speed : 95,
            weapons : {
                1 : {
                    name : 'ブレイクパンチ',
                    power : 1000
                },
                2 : {
                    name : 'ブレイクパンチ',
                    power : 1000
                },
                3 : {
                    name : 'ブレイクパンチ',
                    power : 1000
                },
                4 : {
                    name : 'ブレイクパンチ',
                    power : 1000
                },
                5 : {
                    name : 'ブレイクパンチ',
                    power : 1000
                }
            }
        },
        {
            armdozerId : 'zeroBraver',
            name : 'ゼロブレイバー',
            pictName : 'ZeroBraver.PNG',
            hp : 2100,
            speed : 125,
            weapons : {
                1 : {
                    name : 'バスターナックル',
                    power : 1200
                },
                2 : {
                    name : 'バスターナックル',
                    power : 1200
                },
                3 : {
                    name : 'バスターナックル',
                    power : 1200
                },
                4 : {
                    name : 'バスターナックル',
                    power : 1200
                },
                5 : {
                    name : 'バスターナックル',
                    power : 1200
                }
            }
        }
    ];

    Game.start();
    Game.onload = function(){
        testScene = selectArmdozerScene({
            selectArmdozerId : 'granBraver',
            armdozerList : armdozerList
        });
        Game.replaceScene(testScene);
        Game.currentScene.tl.delay(30).then(pushArmdozerButton);
    };

    function pushArmdozerButton(){
        touch(Game.currentScene.armdozerButtonArray[1]);
        Game.currentScene.tl.delay(30).then(pushOkButton);
    }

    function pushOkButton(){
        touch(Game.currentScene.okButton);
        Game.currentScene.onPushOkButton(assertOfPushArmdozerButton);

    }

    function assertOfPushArmdozerButton(armdozerId){
        assert.equal(armdozerId,'landozer','選択したアームドーザのIDが正しい');
        Game.currentScene.tl.delay(30).then(assertOfMessageWindow);

    }

    function assertOfMessageWindow(){
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージウインドウが表示される');
        assert.equal(Game.currentScene.armdozerButtonArray[0].getVisible(),false,'アームドーザボタン0が非表示');
        assert.equal(Game.currentScene.armdozerButtonArray[1].getVisible(),false,'アームドーザボタン1が非表示');
        assert.equal(Game.currentScene.armdozerButtonArray[2].getVisible(),false,'アームドーザボタン2が非表示');
        assert.equal(Game.currentScene.okButton.getVisible(),false,'決定ボタンが非表示');
        assert.equal(Game.currentScene.prevButton.getVisible(),false,'戻るボタンが非表示');
        finishTest();
    }

}