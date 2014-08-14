enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = selectArmdozer;

function selectArmdozer(){
    var assert = chai.assert;
    var armdozerIdList = [
        {
            name:'グランブレイバー',
            id : 'granBraver'
        },
        {
            name:'ランドーザ',
            id:'landozer'
        },
        {
            name:'ゼロブレイバー',
            id:'zeroBraver'
        },
        {
            name:'バトルドーザ',
            id:'battleDozer'
        }
    ];
    var Game = gameBase();
    var testScene;

    Game.start();
    Game.onload = function(){
        testScene = setArmdozerScene({
            armdozerIdList : armdozerIdList
        });
        Game.replaceScene(testScene);
        assertOfArmdozerList();
    };

    function assertOfArmdozerList(){
        assert.equal(testScene.armdozerButtonArray[0].text,'グランブレイバー','ボタン0のテキストが正しい');
        assert.equal(testScene.armdozerButtonArray[1].text,'ランドーザ','ボタン1のテキストが正しい');
        assert.equal(testScene.armdozerButtonArray[2].text,'ゼロブレイバー','ボタン2のテキストが正しい');
        assert.equal(testScene.armdozerButtonArray[3].text,'バトルドーザ','ボタン3のテキストが正しい');
        selectArmdozer();
    }

    function selectArmdozer(){
        //console.log('ランドーザを選択する');
        touch(testScene.armdozerButtonArray[1]);
        testScene.onSelectArmdozer(assertOfChangeScene);
    }

    function assertOfChangeScene(data){
        var expect = {
            armdozerId : 'landozer'
        };
        assert.deepEqual(data,expect,'メッセージパラメータが正しい');
        finishTest();
    }
}
