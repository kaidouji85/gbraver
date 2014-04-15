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
        }, 3000);
    });

    test.after(function() {
        driver.quit();
    });
});