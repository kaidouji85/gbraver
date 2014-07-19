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
    console.log('test dayon');
    console.log(testCode);//test
    res.render('testClient', {
        testCode : testCode
    });
}