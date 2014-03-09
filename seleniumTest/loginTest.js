var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var URL = 'localhost:3000';

test.describe('ログイン', function() {
    var drivers = new Array();
    
    test.before(function() {
        for(var i=0; i<2; i++){
            var driver = new webdriver.Builder().
                           withCapabilities(webdriver.Capabilities.chrome()).
                           build();
            drivers.push(driver);
        }
    });
    
    test.it('ログインするとルームID、ユーザIDがmetaタグに格納される', function(){
        var driver = drivers[0];
        driver.get(URL);
        driver.findElement(webdriver.By.name('userId')).sendKeys(1);
        driver.findElement(webdriver.By.name('roomId')).sendKeys(0);
        driver.findElement(webdriver.By.name('loginButton')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'Gブレイバー 戦闘' === title;
            });
        }, 1000);
        driver.findElement(webdriver.By.name('userId')).getAttribute('content').then(function(userId){
            driver.findElement(webdriver.By.name('roomId')).getAttribute('content').then(function(roomId){
                assert.equal(userId,1,'正しいユーザIDがMetaタグに格納されている');
                assert.equal(roomId,0,'正しいルームIDがMetaタグに格納されている');
            });
        });
                
    });
    
    test.it('異なるユーザが2人同じ部屋にログインしたので「succesEnterRoom」がサーバから送信される', function() {
        //ログイン処理
        drivers.forEach(function(driver,index) {
            driver.get(URL);
            var userId = driver.findElement(webdriver.By.name('userId'));
            var roomId = driver.findElement(webdriver.By.name('roomId'));
            var loginButton = driver.findElement(webdriver.By.name('loginButton'));
            userId.sendKeys(index===0 ? 1 : 2);
            roomId.sendKeys(1);
            loginButton.click();
        });
        
        //入室確認
        drivers.forEach(function(driver,index) {
            driver.wait(function() {
                return driver.getTitle().then(function(title) {
                    return 'Gブレイバー 戦闘'===title;
                });
            }, 1000);
            
            /*
            driver.executeScript(function() {
                gbraver.acceptGameStart = false;
                gbraver.socket.once("gameStart",function(data){
                    gbraver.acceptGameStart = true;
                    gbraver.gameStartRespData;
                });
            });
            */
        });
    }); 

    test.after(function() {
        drivers.forEach(function(driver){
            driver.quit();
        });
    });
}); 