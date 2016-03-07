var testGlob = require('../../testGlob');
var __ = require('underscore');

function getTestFileEntries(dir){
    var pathList = testGlob().glob(dir);
    var keyList = __.map(pathList, function(path){
        // 先頭のディレクトリ名を削除
        return path.substr(dir.length+1);
    });
    var valueList = __.map(pathList, function(path){
        return './'+path;
    });
    var ret = __.object(keyList,valueList);
    return ret;
}

module.exports = {
    entry: getTestFileEntries('srcForTest'),
    output: {
        path: './buildForTest/javascripts',
        filename: '[name]'
    },
    devtool: 'inline-source-map'
};