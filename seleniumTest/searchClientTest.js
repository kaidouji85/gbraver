describe('画面テストリストの自動作成',function(){
    var assert = require('chai').assert;
    var testCollector = require('./testCollector.js');

    it('*Test.jsだけをリストアップする',function(done){
        var tc = testCollector();
        //プロジェクトルート(app.jsが置かれているパス)からの相対パスで書く
        tc.collect('seleniumTest/testDir',collectResult);

        function collectResult(err,result){
            var expectResult = [
                'seleniumTest/testDir/attackAnimeTest.js',
                'seleniumTest/testDir/missAnimeTest.js',
                'seleniumTest/testDir/dir1/search1Test.js'
            ];
            assert.equal(err,null,'errオブジェクトがnull');
            assert.sameMembers(result,expectResult,'*Test.jsだけをピックアップ');
            done();
        }
    });
});