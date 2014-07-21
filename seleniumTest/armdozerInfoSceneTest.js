var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('アームドーザ情報画面', function() {
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

    test.it('決定ボタンを押したら表示中のアームドーザのIDをコールバック関数に返す', function(){
        util.doClientTest('/javascripts/armdozerInfoSceneTest/selectArmdozerTest.js');
    });

    test.it('戻るボタンを押したらコールバック関数が呼ばれる', function(){
        util.doClientTest('/javascripts/armdozerInfoSceneTest/pushPrevButtonTest.js');
    });
});