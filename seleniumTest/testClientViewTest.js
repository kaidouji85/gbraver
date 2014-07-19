var PORT = process.env.PORT || 3000;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('testClientテスト', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
    });

    test.after(function() {
        driver.quit();
    });

    test.it('リクエストパラメータに指定したコードがViewに埋め込まれる', function(){
        var testCodeName = '/javascripts/playerAtackTest.js';
        var URL = 'localhost:'+PORT+'/testClient?code='+testCodeName;
        driver.get(URL);
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return testCodeName === title;
            });
        }, 1000);
        driver.findElement(webdriver.By.name('testCode')).getAttribute('src').then(function(src){
            assert.equal(src,'http://localhost:3000/javascripts/playerAtackTest.js','正しいテストコードがScriptタグに格納されている');
        });
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'finish' === title;
            });
        }, 10000);
    });
});