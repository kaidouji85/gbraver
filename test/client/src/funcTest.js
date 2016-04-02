// TODO テストコードのサンプル。実際にテストコードを書いたら消す。
var assert = require('chai').assert;
var func = require('../../../client/func');

describe('試しに作ってみたテスト', function(){
    it('テスト1', function() {
        assert.equal(func(), 'test');
    });
});