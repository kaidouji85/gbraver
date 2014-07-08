var PORT = process.env.PORT || 3000;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('ゲーム画面', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
    });
    
    function doClientTest(url,testName){
        var URL = 'localhost:'+PORT+'/'+url;
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return testName === title;
            });
        }, 1000);
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    }
        
    //setArmdozerScene
    test.it('アームドーザが選択できる', function(){
        doClientTest('setArmdozerTest.html','アームドーザが選択できる');
    });
    
    //battleScene
    test.it('プレイヤーがチャージを選択する', function(){
        doClientTest('playerChargeTest.html','プレイヤーがチャージを選択する');
    });
    
    test.it('プレイヤーが攻撃を選択する', function(){
        doClientTest('playerAtackTest.html','プレイヤーが攻撃を選択する');
    });
    
    test.it('敵が攻撃を選択する', function(){
        doClientTest('enemyAtackTest.html','敵が攻撃を選択する');
    });

    test.it('敵がチャージを選択する', function(){
        doClientTest('enemyChargeTest.html','敵がチャージを選択する');
    });

    //attackHitAnime
    test.it('プレイヤー側攻撃ヒットアニメが例外なく再生される', function(){
        doClientTest('playerAttackHitAnimeTest.html','プレイヤー側攻撃ヒットアニメが例外なく再生される');
    });

    test.it('敵側攻撃ヒットアニメが例外なく再生される', function(){
        doClientTest('enemyAttackHitAnimeTest.html','敵側攻撃ヒットアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃ミスアニメが例外なく再生される', function(){
        doClientTest('playerAttackMissAnimeTest.html','プレイヤー側攻撃ミスアニメが例外なく再生される');
    });

    test.it('敵側攻撃ミスアニメが例外なく再生される', function(){
        doClientTest('enemyAttackMissAnimeTest.html','敵側攻撃ミスアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃クリティカルアニメが例外なく再生される', function(){
        doClientTest('playerAttackCriticalAnimeTest.html','プレイヤー側攻撃クリティカルアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃防御アニメが例外なく再生される', function(){
        doClientTest('playerAttackDefenseAnimeTest.html','プレイヤー側攻撃防御アニメが例外なく再生される');
    });
    //roomSelectScene
    test.it('戦闘ルームに入室する', function(){
        doClientTest('roomSelectTest.html','戦闘ルームに入室する');
    });

    //changeScene
    test.it('トップメニューからルーム選択画面へ遷移', function(){
        doClientTest('topToRoomSelectTest.html','トップメニューからルーム選択画面へ遷移');
    });

    test.it('トップメニューからアームドーザ選択画面へ遷移', function(){
        doClientTest('topToSetArmdozerTest.html','トップメニューからアームドーザ選択画面へ遷移');
    });

    test.it('アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移', function(){
        doClientTest('setArmdozerToTopTest_landozer.html','アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移');
    });
    
    test.it('アームドーザ選択画面から「戻る」ボタンを押下してトップ画面に遷移', function(){
        doClientTest('setArmdozerToTopTest_prev.html','アームドーザ選択画面から「戻る」ボタンを押下してトップ画面に遷移');
    });
    
    test.it('ルーム選択画面から戦闘画面に遷移', function(){
        doClientTest('roomSelectToBattleTest.html','ルーム選択画面から戦闘画面に遷移');
    });
    
    test.it('ルーム選択画面から「戻る」ボタンを押してトップ画面へ遷移', function(){
        doClientTest('roomSelectToTopTest.html','ルーム選択画面から「戻る」ボタンを押してトップ画面へ遷移');
    });

    test.it('敵を撃破してトップ画面へ戻る', function(){
        doClientTest('battleToTopTest_win.html','敵を撃破してトップ画面へ戻る');
    });

    test.it('撃破されてトップ画面へ戻る', function(){
        doClientTest('battleToTopTest_lose.html','撃破されてトップ画面へ戻る');
    });

    test.after(function() {
        driver.quit();
    });
    
});