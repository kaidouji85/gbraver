var __ = require('underscore');
var path = require('path');
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
 * 画面テストの全ファイルをビルドする設定
 */
var buildAllTest = {
    entry: createTestFlieEntries(),
    output: {
        path: gameTestConfig.TEST_BUILD_DIR,
        filename: '[name]'
    },
    devtool: 'inline-source-map'
}

/**
 * 画面テストの単体ファイルをビルドする設定
 *
 * @param target ビルドファイル名
 * @returns {Object} 面テストの単体ファイルをビルドする設定
 */
function buildSingleTest(target) {
    return {
        entry: gameTestConfig.TEST_SRC_DIR + target,
        output: {
            path: gameTestConfig.TEST_BUILD_DIR,
            filename: target
        },
        devtool: 'inline-source-map'
    }
}

/**
 * 画面テストのビルド設定を返す
 *
 * @param target ビルド対象のファイル名
 * @returns {Object} 画面テストのビルド設定
 */
function gameTest(target) {

    if (!!target) {
        return buildSingleTest(target);
    }

    return buildAllTest;
};

/**
 * 画面のユニットテストのビルド設定
 */
var unitTest = {
    entry: glob.sync('./test/client/src/**/*.js'),
    output: {
        path: './test/client/build/',
        filename: 'test.js'
    },
    devtool: 'inline-source-map'
};

/**
 * webpackの設定
 *
 * @param target ビルド対象のファイル名
 * @returns {Object} webpackの設定
 */
module.exports = function(target) {
    return {
        // 共通ビルド設定
        options: {
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
                ]
            },
            resolve: {
                // require、importをする時のエイリアスを設定する
                // パス指定は path.resolve(Readme.mdからの相対パス) で書く
                alias: {
                    'client': path.resolve('client'),
                    'game-test': path.resolve('test/game/src')
                }
            }
        },
        // プロダクトのビルド
        product: product,

        // 画面テストのビルド
        gameTest: gameTest(target),

        // 画面のユニットテストのビルド
        unitTest: unitTest,

        // プロダクトのWATCH
        watchProduct: __.extend({}, product, watch),

        // 画面テストのWATCH
        watchGameTest: __.extend({}, gameTest(target), watch),

        // 画面のユニットテストのWATCH
        watchUnitTest: __.extend({}, unitTest, watch),

        // DBシェルのビルド
        db: {
            entry: './dbShell/index.js',
            output: {
                path: './dbShell/build',
                filename: 'index.js'
            },
        }
    }
}