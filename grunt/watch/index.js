var PRODUCT_SOURCE_PATH = 'src/**/*.js';
var TEST_SOURCE_PATH = 'srcForTest/**/*.js';

module.exports = {
    product: {
        files: [PRODUCT_SOURCE_PATH],
        tasks: ['webpack:product']
    },
    test: {
        files: [PRODUCT_SOURCE_PATH, TEST_SOURCE_PATH],
        tasks: ['webpack:test']
    }
};