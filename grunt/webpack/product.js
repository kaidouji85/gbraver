/**
 * プロダクトのビルド設定
 * @type {Object}
 */
module.exports = {
    entry: "./client/index.js",
    output: {
        path: './public/javascripts/',
        filename: 'index.js'
    },
    devtool: 'inline-source-map'
};