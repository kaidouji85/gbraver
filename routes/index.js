exports.index = function(req, res){
  res.render('index', {title:'Gブレイバー'});
};

exports.battle = function(req, res){
  var userId = req.body.userId;
  var roomId = req.body.roomId;
  res.render('battle', {userId:userId,roomId:roomId});
};

exports.selectRoom = function(req, res){
  res.render('selectRoom', {});
};