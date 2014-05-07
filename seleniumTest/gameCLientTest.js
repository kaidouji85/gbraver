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

    test.it('プレイヤーがチャージを選択する', function(){
        var URL = 'localhost:'+PORT+'/playerChargeTest.html';
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'プレイヤーがチャージを選択する' === title;
            });
        }, 1000);
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });

    test.it('プレイヤーが攻撃を選択する', function(){
        var URL = 'localhost:'+PORT+'/playerAtackTest.html';
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'プレイヤーが攻撃を選択する' === title;
            });
        }, 1000);
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });
    
    test.it('敵が攻撃を選択する', function(){
        var URL = 'localhost:'+PORT+'/enemyAtackTest.html';
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return '敵が攻撃を選択する' === title;
            });
        }, 1000);
       
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });

    test.it('敵がチャージを選択する', function(){
        var URL = 'localhost:'+PORT+'/enemyChargeTest.html';
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return '敵がチャージを選択する' === title;
            });
        }, 1000);
       
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });
    
    test.it('ルームセレクトして戦闘画面に遷移する', function(){
        var URL = 'localhost:'+PORT+'/roomSelectTest.html';
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'ルームセレクトして戦闘画面に遷移する' === title;
            });
        }, 1000);
       
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });
    test.after(function() {
        driver.quit();
    });
});