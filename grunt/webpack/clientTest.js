var glob = require('glob');

/**
 * クライアントユニットテストのビルド設定
 * @type {Object}
 */
module.exports = {
    entry: glob.sync('./test/client/src/**/*.js'),
    output: {
        path: './test/client/build/',
        filename: 'test.js'
    },
    devtool: 'inline-source-map'
};