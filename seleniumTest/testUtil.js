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
     * テスト実行を待つ
     * クライアント側でエラーが発生した場合は、即座に中止する
     * @returns {Object} Promise
     */
    function waitTest() {
        var driver = spec.driver;
        return driver.executeScript(function(){
            return window.jsErrors;
        }).then(function(jsErrors) {
            if(jsErrors.length > 0) {
                throw new Error(jsErrors);
            }
            return driver.getTitle();
        }).then(function(title) {
            return title === 'finish';
        });
    }

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
        driver.wait(waitTest, 22000);
    }

    return that;
}