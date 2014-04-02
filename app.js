//定数
var PORT = process.env.PORT || 3000;
var IP =  process.env.IP || 'localhost';
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ce = require('cloneextend');
var mongoDao = require('./mongoDao.js');
var passport = require('passport');
var app = express();

// all environments
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(passport.initialize());
app.use(passport.session());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.use(express.static(path.join(__dirname, 'debugPublic')));
}
//DB
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/gbraver';
var dao = mongoDao({url : mongoUri});

//Google認証
var GoogleStrategy = require('passport-google').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL : 'http://'+IP+':'+PORT+'/auth/google/return',
    realm : 'http://'+IP+':'+PORT+'/'
},function(identifier, profile, done) {
    done(null, profile);
}));

//ルーティング
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/battle', routes.battle);
app.get('/selectRoom',routes.selectRoom);
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        req.session.gbraver = {
            user : user
        };
        if(user){
            res.redirect('/selectRoom');
        } else {
            res.redirect('/');
        }
    })(req, res, next);
});


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
    dao.getPlayerData(userId,function(err,data){
        fn(null,data);
    });
});