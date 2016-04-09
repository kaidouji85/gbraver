var gameTestConfig = require('../../game.test.config');
var __ = require('underscore');

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
 * ゲーム画面テストのwebpack.config.js
 * @type {object}
 */
module.exports = {
    entry: createTestFlieEntries(),
    output: {
        path: gameTestConfig.TEST_BUILD_DIR,
        filename: '[name]'
    },
    devtool: 'inline-source-map'
};