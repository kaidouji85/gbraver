var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var TEST_DIR = 'buildForTest';
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var testGlob = require('./../testGlob');

test.describe('画面テスト', function() {
    var util;
    var driver;

    test.before(function() {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
        util = testUtil({
            baseUrl : BASE_URL,
            driver : driver
        });
    });

    test.after(function() {
        driver.quit();
    });

    (function(){
        var tg = testGlob();
        var fileList = tg.glob(TEST_DIR+'/javascripts');
        fileList.forEach(function(item){
            var fileName = item.slice(TEST_DIR.length+1);
            test.it(fileName, function(){
                util.doClientTest(fileName);
            });
        });
    })();
});