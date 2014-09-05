//定数
var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:'+PORT;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//test add start
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);
//test add end

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
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: BASE_URL+"/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

//ルーティング
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gameMain', routes.gameMain);

app.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    }
);

app.get('/auth/google/callback', function (req, res, next) {
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

if('development' == app.get('env')){
    app.get('/testClient',routes.testClient);
}

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
WsServer.onGetCharacterInfo(dao.getCharacterInfo);