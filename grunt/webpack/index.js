var __ = require('underscore');

/**
 * ビルド系のwebpack.config.jsに共通設定を追加して返す
 * @param config webpack.config.js
 * @return {obejct}
 */
function createBuild(config) {
    return __.extend({}, config, {
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
                ]
            }
        });
}

/**
 * webpack.config.jsからwatch系ビルドを生成する
 * @param config webpack.config.js
 * @returns {Object}
 */
function createWatch(config) {
    return __.extend({}, config, {
        cache: true,
        watch: true,
        keepalive: true
    });
}

var build = {
    product: createBuild(require('./product.js')),
    test: createBuild(require('./test')),
    clientTest: createBuild(require('./clientTest'))
};

var watch = {
    watchProduct: createWatch(build.product),
    watchTest: createWatch(build.test),
    watchClientTest: createWatch(build.clientTest),
}

module.exports = __.extend({}, build, watch);