var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var URL = 'localhost:3000';

test.describe('ログイン', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
    });
    
    //TODO : パスワード認証が未実装
    test.it('ログインするとルームID、ユーザIDがmetaタグに格納される', function(){
        driver.get(URL);
        driver.findElement(webdriver.By.name('userId')).sendKeys('take');
        driver.findElement(webdriver.By.name('password')).sendKeys('pass');
        driver.findElement(webdriver.By.name('roomId')).sendKeys(0);
        driver.findElement(webdriver.By.name('loginButton')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'Gブレイバー 戦闘' === title;
            });
        }, 1000);
        driver.findElement(webdriver.By.name('userId')).getAttribute('content').then(function(userId){
            driver.findElement(webdriver.By.name('roomId')).getAttribute('content').then(function(roomId){
                assert.equal(userId,'take','正しいユーザIDがMetaタグに格納されている');
                assert.equal(roomId,0,'正しいルームIDがMetaタグに格納されている');
            });
        });        
    });

    test.after(function() {
        driver.quit();
    });
}); 