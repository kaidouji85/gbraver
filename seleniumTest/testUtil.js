module.exports = testUtil;

function testUtil(spec,my) {
    var that = {};
    var baseUrl = spec.baseUrl;
    var webdriver = spec.webdriver;

    that.doClientTest =doClientTest;

    function doClientTest(testCode) {
        var url = baseUrl+'/testClient?code='+testCode;
        webdriver.get(url);
        webdriver.wait(function () {
            return webdriver.getTitle().then(function (title) {
                return testCode === title;
            });
        }, 1000);

        webdriver.wait(function () {
            return webdriver.getTitle().then(function (title) {
                return 'finish' === title;
            });
        }, 17000);
    }

    return that;
}