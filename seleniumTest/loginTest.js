var NODE_MAIL_ADDRESS = process.env.NODE_MAIL_ADDRESS || null;
var NODE_PASSWORD = process.env.NODE_PASSWORD || null;
var PORT = process.env.PORT || 3000;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var URL = 'localhost:'+PORT;


test.describe('ログイン', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
    });
    
    test.after(function() {
        driver.quit();
    });
    
    test.it('ログインするとルームID、ユーザIDがmetaタグに格納される', function(){
        driver.get(URL);
        driver.findElement(webdriver.By.name('googleLogin')).click();

        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'ログイン - Google アカウント' === title;
            });
        }, 1000);

        driver.findElement(webdriver.By.name('Email')).sendKeys(NODE_MAIL_ADDRESS);
        driver.findElement(webdriver.By.name('Passwd')).sendKeys(NODE_PASSWORD);
        driver.findElement(webdriver.By.name('signIn')).click();

        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'Gブレイバー' === title;
            });
        }, 10000);
        driver.findElement(webdriver.By.name('userId')).getAttribute('content').then(function(userId){
            assert.equal(userId,NODE_MAIL_ADDRESS,'正しいユーザIDがMetaタグに格納されている');
        });
    });
});