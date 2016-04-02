var __ = require('underscore');
var gameTestConfig = require('../game.test.config');

function routes(spec,my){
    var that = {};
    var contentBaseUrl = spec.contentBaseUrl;


    that.root = function(req, res){
        if(req.session.gbraver){
            var userId = req.session.gbraver.userid;
            res.render('gameMain', {
                userId : userId,
                contentBaseUrl : contentBaseUrl
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
            testCode : testCode,
            contentBaseUrl : contentBaseUrl
        });
    }

    that.testList = function(req, res){
        var testList = gameTestConfig.TEST_FILES();
        res.render('testList',{
            title : 'テスト一覧 (total'+testList.length + ')',
            testList : testList,
            urlList: testList
        });
    }

    return that;
}

module.exports = routes;