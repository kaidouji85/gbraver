describe('画面テストリストの自動作成',function(){
    var assert = require('chai').assert;
    var testGlob = require('./testGlob.js');

    it('*Test.jsだけをリストアップする',function(){
        var tg = testGlob();
        var actual = tg.glob('seleniumTest/testDir');//プロジェクトルート(app.jsが置かれているパス)からの相対パスで書く
        var expectResult = [
            'seleniumTest/testDir/attackAnimeTest.js',
            'seleniumTest/testDir/missAnimeTest.js',
            'seleniumTest/testDir/dir1/search1Test.js'
        ];
        assert.sameMembers(actual,expectResult,'*Test.jsだけをピックアップ');
    });
});