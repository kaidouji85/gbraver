var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('攻撃アニメ', function() {
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

    test.it('プレイヤー側マイターンアニメを再生する', function(){
        util.doClientTest('/javascripts/myTurnAnimeTest/playerTurn.js');
    });

    test.it('敵側マイターンアニメを再生する', function(){
        util.doClientTest('/javascripts/myTurnAnimeTest/enemyTurn.js');
    });
});