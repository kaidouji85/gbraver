var __ = require('underscore');

/**
 * webpack.config.jsからwatch系ビルドを生成する
 * @param testConfig 元にするwebpack.config.js
 * @returns {*}
 */
function createWatch(testConfig) {
    return __.extend({}, testConfig, {
        cache: true,
        watch: true,
        keepalive: true
    });
}

module.exports = {
    product: require('./product.js'),
    test: require('./test'),
    clientTest: require('./clientTest'),
    watchProduct: createWatch(require('./product.js')),
    watchTest: createWatch(require('./test')),
    watchClientTest: createWatch(require('./clientTest')),
}
