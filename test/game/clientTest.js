var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var executor = require('./executor');
var gameTestConfig = require('../../game.test.config');

test.describe('画面テスト', function() {
    var execute;
    var driver;

    test.before(function() {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
        execute = executor({
            baseUrl : BASE_URL,
            driver : driver
        }).execute;
    });

    test.after(function() {
        driver.quit();
    });

    (function(){
        var fileList = gameTestConfig.TEST_FILES();
        fileList.forEach(function(item){
            test.it(item, function(){
                execute(item);
            });
        });
    })();
});