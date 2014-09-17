//定数
var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:'+PORT;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoDao = require('./mongoDao.js');
var passport = require('passport');
var enemyRoutineDefine = require('./enemyRoutineDefine.js');
var app = express();

// all environments
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());  //TODO : とりあえず放置
//app.use(express.logger('dev'));　//TODO : とりあえず放置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: 'kaidouji85'}));
app.use(passport.initialize());
app.use(passport.session());

// development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());  //TODO : とりあえず放置
    app.use(express.static(path.join(__dirname, 'publicForDebug')));
    app.use(express.static(path.join(__dirname, 'publicForTest')));
}
//DB
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/gbraver';
var dao = mongoDao({url : mongoUri});

//google OAuth2
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

//http server
var server = app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//socket.io server
var wsServer = require('./server.js');
var WsServer = wsServer({
    httpServer : server
});
WsServer.onGetPlayerData(dao.getPlayerData);
WsServer.onSetArmdozerId(dao.setArmdozerId);
WsServer.onGetCharacterList(dao.getCharacterList);
WsServer.onGetCharacterInfo(dao.getCharacterInfo);
WsServer.onGetAttackRoutine(enemyRoutineDefine.getAttackRoutine);
WsServer.onGetDefenseRoutine(enemyRoutineDefine.getDefenseRoutine);