var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('パイロット選択画面', function() {
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

    test.it('戻るボタンが押せる', function(){
        util.doClientTest('/javascripts/selectPilotSceneTest/pushPrevButtonTest.js');
    });

    test.it('パイロットボタンを押して詳細情報を表示する', function(){
        util.doClientTest('/javascripts/selectPilotSceneTest/pushPilotButtonTest.js');
    });
});