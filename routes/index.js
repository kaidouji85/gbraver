exports.index = function(req, res){
  res.render('index', {title:'Gブレイバー'});
};

exports.gameMain = function(req, res) {
    var userId = req.session.gbraver.user.emails[0].value;
    res.render('gameMain', {
        userId : userId
    });
}; 

/*
exports.selectRoom = function(req, res){
  res.render('selectRoom', {});
};
*/