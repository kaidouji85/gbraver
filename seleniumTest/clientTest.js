var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var TEST_DIR = 'buildForTest';
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;
var testGlob = require('./testGlob.js');

test.describe('画面テスト', function() {
    test.before(function() {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
        util = testUtil({
            baseUrl : BASE_URL,
            webdriver : driver
        });
    });

    test.after(function() {
        driver.quit();
    });

    globTestJs();
    function globTestJs(){
        var tg = testGlob();
        var fileList = tg.glob(TEST_DIR+'/javascripts');
        var file;
        for(var i in fileList){
            file = fileList[i].slice(TEST_DIR.length+1);
            doTest(file);
        }
    }

    function doTest(testFile){
        test.it(testFile, function(){
            util.doClientTest(testFile);
        });
    }
});