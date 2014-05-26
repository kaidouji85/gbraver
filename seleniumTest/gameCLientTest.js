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
    
    test.it('戦闘ルームに入室する', function(){
        doClientTest('roomSelectTest.html','戦闘ルームに入室する');
    });

    test.it('トップメニューからルーム選択画面へ遷移', function(){
        doClientTest('topToRoomSelectTest.html','トップメニューからルーム選択画面へ遷移');
    });

    test.it('トップメニューからアームドーザ選択画面へ遷移', function(){
        doClientTest('topToSetArmdozerTest.html','トップメニューからアームドーザ選択画面へ遷移');
    });

    test.it('アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移', function(){
        doClientTest('setArmdozerToTopTest_landozer.html','アームドーザ選択画面から「ランドーザ」ボタンを押下してトップ画面に遷移');
    });
            
    test.after(function() {
        driver.quit();
    });
    
});