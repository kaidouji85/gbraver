var __ = require('underscore');
var glob = require('glob');
var gameTestConfig = require('../../game.test.config');

/**
 * テストファイルのエントリーを生成する
 * @returns {Object}
 *          { テストファイル名: テストファイルのパス , ......}
 */
function createTestFlieEntries() {
    var names = gameTestConfig.TEST_FILES();
    var entries = __.map(names, function(item){
        return gameTestConfig.TEST_SRC_DIR + item;
    });
    return __.object(names, entries);
}

/**
 * WATCHの共通設定
 */
var watch = {
    cache: true,
    watch: true,
    keepalive: true
}

/**
 * プロダクトのビルド設定
 */
var product = {
    entry: "./client/index.js",
    output: {
        path: './public/javascripts/',
        filename: 'index.js'
    },
    devtool: 'inline-source-map'
};

/**
 * 画面テストのビルド設定
 */
var test = {
    entry: createTestFlieEntries(),
    output: {
        path: gameTestConfig.TEST_BUILD_DIR,
        filename: '[name]'
    },
    devtool: 'inline-source-map'
};

/**
 * 画面のユニットテストのビルド設定
 */
var clientTest = {
    entry: glob.sync('./test/client/src/**/*.js'),
    output: {
        path: './test/client/build/',
        filename: 'test.js'
    },
    devtool: 'inline-source-map'
};

module.exports = {
    // 共通ビルド設定
    options: {
        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        }
    },
    // プロダクトのビルド
    product: product,

    // 画面テストのビルド
    test: test,

    // 画面のユニットテストのビルド
    clientTest: clientTest,
    
    // プロダクトのWATCH 
    watchProduct: __.extend({}, product, watch),
    
    // 画面テストのWATCH
    watchTest: __.extend({}, test, watch),
    
    // 画面のユニットテストのWATCH
    watchClientTest: __.extend({}, clientTest, watch)
}