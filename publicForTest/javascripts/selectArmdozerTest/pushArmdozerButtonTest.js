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
        Game.currentScene.onPushOkButton(assertOfPushArmdozerButton);
        touch(Game.currentScene.armdozerButtonArray[1]);
    }

    function assertOfPushArmdozerButton(armdozerId){
        assert.equal(armdozerId,'landozer','選択したアームドーザのIDが正しい');
        finishTest();
    }

}