var glob = require('glob');
var __ = require('underscore');

/**
 * ゲーム画面テストの共通設定
 * 様々なモジュールで使われているゲーム画面テストの設定を一つにまとめたもの
 */

/**
 * 画面テストの基本となるパス
 * @type {string}
 */
module.exports.TEST_BASIC_DIR = './test/game/';

/**
 * テストコードの基本となるパス
 * @type {string}
 */
module.exports.TEST_SRC_DIR = module.exports.TEST_BASIC_DIR + 'src';

/**
 * テストコードをビルドしたものを配置するパス
 * @type {string}
 */
module.exports.TEST_BUILD_DIR = module.exports.TEST_BASIC_DIR + 'build';

/**
 * テスト時だけにサーバに公開するリソースの基本パス
 * @type {string}
 */
module.exports.TEST_PUBLIC_DIR = module.exports.TEST_BASIC_DIR + 'public';

/**
 * テストファイルリストを取得する関数
 * @return String[] テストファイル名の配列
 */
module.exports.TEST_FILES = function() {
    var pathList = glob.sync(module.exports.TEST_SRC_DIR+'/**/*Test.js');
    return __.map(pathList, function(item){
        return item.slice(module.exports.TEST_SRC_DIR.length);
    });
}