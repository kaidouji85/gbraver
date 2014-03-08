var assert = require('assert');
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

    test.it('2人が同じ部屋にログインして戦闘画面が表示される', function() {
        drivers.forEach(function(driver,index) {
            driver.get(URL);
            var userId = driver.findElement(webdriver.By.name('userId'));
            var roomId = driver.findElement(webdriver.By.name('roomId'));
            var loginButton = driver.findElement(webdriver.By.name('loginButton'));
            userId.sendKeys(index===0 ? 1 : 2);
            roomId.sendKeys(1);
            loginButton.click();       
        });
        
        drivers[1].wait(function(){
            return false;
        }, 100000000);
        
    }); 

    test.after(function() {
        drivers.forEach(function(driver){
            driver.quit();
        });
    });
}); 