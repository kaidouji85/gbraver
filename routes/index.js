exports.index = function(req, res){
  res.render('index', {title:'Gブレイバー'});
};

exports.battle = function(req, res){
  var userId = req.session.gbraver.user.emails[0].value;
  var roomId = req.body.roomId;
  res.render('battle', {userId:userId,roomId:roomId});
};

exports.selectRoom = function(req, res){
  res.render('selectRoom', {});
};