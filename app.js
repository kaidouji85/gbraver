/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.use(express.static(path.join(__dirname, 'debugPublic')));
}

//DB::接続オブジェクト
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/gbraver';
mongoose.connect(mongoUri);

//DB::ユーザ情報モデル
var usersSchema = mongoose.Schema({
    userId : Number,
    status : {
        name : String,
        pictName : String,
        hp : Number,
        speed : Number,
        weapons : {
            1 : {name : String,power : Number},
            2 : {name : String,power : Number},
            3 : {name : String,power : Number},
            4 : {name : String,power : Number},
            5 : {name : String,power : Number}
        }
    }
});
var Users = mongoose.model('Users', usersSchema); 

//ルーティング
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/battle', routes.battle);

//httpサーバ
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

//WebsocketServer
var wsServer = require('./server.js');
var WsServer = wsServer({
    httpServer:server
});
WsServer.onGetUserData(function(userId,fn){
    Users.find({
        userId : userId
    }, function(err, respUsers) {
        var userInfo = respUsers[0];
        fn(null, userInfo);
    });
});
