var testUtil = require('../testlib/testUtil');
var gameBase = require('../../src/game/gameBase');

//TODO : リソースのロード時間を測定するテストページ
//       JavaScriptのコンソールに測定結果が表示される
//       現状ではパフォーマンステストを手動で実行している
enchant();
window.onload = doTest;

function doTest(){
    var testGame = gameBase({
        contentBaseUrl : $("meta[name=contentBaseUrl]").attr('content') //TODO : 他テストにも横展開する
    });
    console.log(getTime() + 'load start');
    testGame.start();
    testGame.onload = function(){
        console.log(getTime() + 'load end');
        testUtil.finishTest();
    };
}

function getTime(){
    var time = new Date();
    return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+':'+time.getMilliseconds();
}