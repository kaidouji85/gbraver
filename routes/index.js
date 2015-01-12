function routes(spec,my){
    var that = {};
    var testGlob = spec.testGlob;
    var contentBaseUrl = spec.contentBaseUrl;


    that.index = function(req, res){
        if(req.session.gbraver){
            var userId = req.session.gbraver.user.emails[0].value;
            res.render('gameMain', {
                userId : userId
            });
        } else {
            res.render('index', {title:'Gブレイバー'});
        }
    }

    //TODO : テストコードがない
    that.logOff = function(req, res){
        req.session.gbraver = null;
        res.redirect('/');

    }

    that.testClient = function(req, res){
        var testCode = req.query.code;
        res.render('testClient', {
            testCode : testCode
        });
    }

    that.testList = function(req, res){
        var tg = testGlob();
        var testList = tg.glob('publicForTest/javascripts');
        res.render('testList',{
            title : 'テスト一覧 (total'+testList.length + ')',
            testList : testList
        });
    }

    return that;
}

module.exports = routes;