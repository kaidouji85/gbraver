var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('戦闘画面', function() {
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

    test.it('プレイヤーがチャージを選択する', function(){
        util.doClientTest('/javascripts/battleSceneTest/chargeByPlayer.js');
    });

    test.it('プレイヤーが攻撃を選択する', function(){
        util.doClientTest('/javascripts/battleSceneTest/attackByPlayer.js');
    });

    test.it('敵がチャージを選択する', function(){
        util.doClientTest('/javascripts/battleSceneTest/chargeByEnemy.js');
    });

    test.it('敵が攻撃を選択する', function(){
        util.doClientTest('/javascripts/battleSceneTest/attackByEnemy.js');
    });
});