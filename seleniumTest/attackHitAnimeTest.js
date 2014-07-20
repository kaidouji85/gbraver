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

    test.it('プレイヤー側攻撃ヒットアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackHitByPlayer.js');
    });

    test.it('敵側攻撃ヒットアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackHitByEnemy.js');
    });

    test.it('プレイヤー側攻撃ミスアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackMissByPlayer.js');
    });

    test.it('敵側攻撃ミスアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackMissByEnemy.js');
    });

    test.it('プレイヤー側攻撃クリティカルアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackCriticalByPlayer.js');
    });

    test.it('敵側攻撃クリティカルアニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackCriticalByEnemy.js');
    });

    test.it('プレイヤー側攻撃防御アニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackDefenseByPlayer.js');
    });

    test.it('敵側攻撃防御アニメを再生する', function(){
        util.doClientTest('/javascripts/attackHitAnimeTest/attackDefenseByEnemy.js');
    });
});