var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('ゲーム画面', function() {
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
        util = testUtil({
            webdriver : driver
        });
    });

    test.after(function() {
        driver.quit();
    });
        
    //setArmdozerScene
    test.it('アームドーザが選択できる', function(){
        util.doClientTest(BASE_URL+'/setArmdozerTest.html','アームドーザが選択できる');
    });
    
    //battleScene
    test.it('プレイヤーがチャージを選択する', function(){
        util.doClientTest(BASE_URL+'/playerChargeTest.html','プレイヤーがチャージを選択する');
    });

    test.it('プレイヤーが攻撃を選択する', function(){
        util.doClientTest(BASE_URL+'/playerAtackTest.html','プレイヤーが攻撃を選択する');
    });

    test.it('敵が攻撃を選択する', function(){
        util.doClientTest(BASE_URL+'/enemyAtackTest.html','敵が攻撃を選択する');
    });

    test.it('敵がチャージを選択する', function(){
        util.doClientTest(BASE_URL+'/enemyChargeTest.html','敵がチャージを選択する');
    });

    //attackHitAnime
    test.it('プレイヤー側攻撃ヒットアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/playerAttackHitAnimeTest.html','プレイヤー側攻撃ヒットアニメが例外なく再生される');
    });

    test.it('敵側攻撃ヒットアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/enemyAttackHitAnimeTest.html','敵側攻撃ヒットアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃ミスアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/playerAttackMissAnimeTest.html','プレイヤー側攻撃ミスアニメが例外なく再生される');
    });

    test.it('敵側攻撃ミスアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/enemyAttackMissAnimeTest.html','敵側攻撃ミスアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃クリティカルアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/playerAttackCriticalAnimeTest.html','プレイヤー側攻撃クリティカルアニメが例外なく再生される');
    });

    test.it('敵側攻撃クリティカルアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/enemyAttackCriticalAnimeTest.html','敵側攻撃クリティカルアニメが例外なく再生される');
    });

    test.it('プレイヤー側攻撃防御アニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/playerAttackDefenseAnimeTest.html','プレイヤー側攻撃防御アニメが例外なく再生される');
    });

    test.it('敵側攻撃防御アニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/enemyAttackDefenseAnimeTest.html','敵側攻撃防御アニメが例外なく再生される');
    });

    //myTurnAnime
    test.it('プレイヤー側マイターンアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/playerTurnAnimeTest.html','プレイヤー側マイターンアニメが例外なく再生される');
    });

    test.it('敵側マイターンアニメが例外なく再生される', function(){
        util.doClientTest(BASE_URL+'/enemyTurnAnimeTest.html','敵側マイターンアニメが例外なく再生される');
    });

    //roomSelectScene
    test.it('戦闘ルームに入室する', function(){
        util.doClientTest(BASE_URL+'/roomSelectTest.html','戦闘ルームに入室する');
    });

    //changeScene
    test.it('トップメニューからルーム選択画面へ遷移', function(){
        util.doClientTest(BASE_URL+'/topToRoomSelectTest.html','トップメニューからルーム選択画面へ遷移');
    });

    test.it('トップメニューからアームドーザ選択画面へ遷移', function(){
        util.doClientTest(BASE_URL+'/topToSetArmdozerTest.html','トップメニューからアームドーザ選択画面へ遷移');
    });

    test.it('アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移', function(){
        util.doClientTest(BASE_URL+'/setArmdozerToTopTest_landozer.html','アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移');
    });

    test.it('アームドーザ選択画面から「戻る」ボタンを押下してトップ画面に遷移', function(){
        util.doClientTest(BASE_URL+'/setArmdozerToTopTest_prev.html','アームドーザ選択画面から「戻る」ボタンを押下してトップ画面に遷移');
    });

    test.it('ルーム選択画面から戦闘画面に遷移', function(){
        util.doClientTest(BASE_URL+'/roomSelectToBattleTest.html','ルーム選択画面から戦闘画面に遷移');
    });

    test.it('ルーム選択画面から「戻る」ボタンを押してトップ画面へ遷移', function(){
        util.doClientTest(BASE_URL+'/roomSelectToTopTest.html','ルーム選択画面から「戻る」ボタンを押してトップ画面へ遷移');
    });

    test.it('敵を撃破してトップ画面へ戻る', function(){
        util.doClientTest(BASE_URL+'/battleToTopTest_win.html','敵を撃破してトップ画面へ戻る');
    });

    test.it('撃破されてトップ画面へ戻る', function(){
        util.doClientTest(BASE_URL+'/battleToTopTest_lose.html','撃破されてトップ画面へ戻る');
    });
});