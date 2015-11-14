var testGlob = require('../../testGlob');
var __ = require('underscore');

function getTestFileEntries(dir){
    var pathList = testGlob().glob(dir);
    var keyList = createKey(pathList,dir);
    var valueList = createValue(pathList);
    var ret = __.object(keyList,valueList);
    return ret;
}

function createKey(pathList,dir) {
    return __.map(pathList,function(path){
        // 先頭のディレクトリ名を削除
        return path.substr(dir.length+1);
    });
}

function createValue(pathList) {
    return __.map(pathList,function(path){
        return './'+path;
    });
}

module.exports = {
    entry: getTestFileEntries('srcForTest'),
    output: {
        path: './buildForTest/javascripts',
        filename: '[name]'
    },
    devtool: 'inline-source-map'
};