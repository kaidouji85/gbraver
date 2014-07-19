//定数
var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:'+PORT;

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
    app.use(express.static(path.join(__dirname, 'publicForDebug')));
    app.use(express.static(path.join(__dirname, 'publicForTest')));
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
    returnURL : BASE_URL+'/auth/google/return',
    realm : BASE_URL 
},function(identifier, profile, done) {
    done(null, profile);
}));

//ルーティング
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gameMain', routes.gameMain);
//app.get('/selectRoom',routes.selectRoom);
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        req.session.gbraver = {
            user : user
        };
        if(user){
            res.redirect('/gameMain');
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
WsServer.onGetPlayerData(dao.getPlayerData);
WsServer.onSetArmdozerId(dao.setArmdozerId);
WsServer.onGetCharacterList(dao.getCharacterList);