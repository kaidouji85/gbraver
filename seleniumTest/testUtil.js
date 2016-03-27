var webdriver = require('selenium-webdriver');

/**
 * テストユーティリティ
 * @param spec
 *        spec.driver WebDriverオブジェクト
 *        spec.url ベースURL
 * @returns {Object} テストユーティリティ
 */
module.exports = function(spec) {
    var that = {};

    /**
     * テストを実行する
     * @param fileName テストコード名
     */
    that.doClientTest = function(fileName) {
        var url = spec.baseUrl+'/testClient?code='+fileName;
        var driver = spec.driver;
        var until = webdriver.until;

        driver.get(url);
        driver.wait(until.titleIs(fileName), 1000);
        driver.wait(until.titleIs('finish'), 22000);
    }

    return that;
}