var PORT = process.env.PORT || 3000;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var URL = 'localhost:'+PORT+'/chargeTest.html';

test.describe('ゲーム画面', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
    });

    test.it('チャージを選択してサーバにコマンド送信をする', function(){
        driver.get(URL);
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'Gブレイバー　チャージテスト finish' === title;
            });
        }, 3000);
    });

    test.after(function() {
        driver.quit();
    });
});