module.exports = testUtil;

function testUtil(spec,my) {
    var that = {};
    var webdriver = spec.webdriver;

    that.doClientTest =doClientTest;

    function doClientTest(url, testName, driver) {
        webdriver.get(url);
        webdriver.wait(function () {
            return webdriver.getTitle().then(function (title) {
                return testName === title;
            });
        }, 1000);

        webdriver.wait(function () {
            return webdriver.getTitle().then(function (title) {
                return 'finish' === title;
            });
        }, 10000);
    }

    return that;
}