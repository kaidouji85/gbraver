exports.index = function(req, res){
    if(req.session.gbraver){
        var userId = req.session.gbraver.user.emails[0].value;
        res.render('gameMain', {
            userId : userId
        });
    } else {
        res.render('index', {title:'Gブレイバー'});
    }
};

exports.testClient = function(req, res){
    var testCode = req.query.code;
    res.render('testClient', {
        testCode : testCode
    });
}

//TODO : テストフォルダからモジュール持ってきてるのが気持ち悪い
var testGlob = require('./testGlob.js');
exports.testList = function(req, res){
    var tg = testGlob();
    var testList = tg.glob('publicForTest/javascripts');
    res.render('testList',{
        title : 'テスト一覧 (total'+testList.length + ')',
        testList : testList
    });
}