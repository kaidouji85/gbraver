exports.index = function(req, res){
  res.render('index', {title:'Gブレイバー'});
};

exports.gameMain = function(req, res) {
    var userId = req.session.gbraver.user.emails[0].value;
    res.render('gameMain', {
        userId : userId
    });
};

exports.testClient = function(req, res){
    var testCode = req.query.code;
    res.render('testClient', {
        testCode : testCode
    });
}
//TODO : テストフォルダからモジュール持ってきてるのが気持ち悪い
var testGlob = require('../seleniumTest/testGlob.js');
exports.testList = function(req, res){
    var tg = testGlob();
    var testList = tg.glob('publicForTest/javascripts');
    res.render('testList',{
        title : 'テスト一覧 (total'+testList.length + ')',
        testList : testList
    });
}