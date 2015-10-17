//const
var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:'+PORT;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var CONTENT_BASE_URL = process.env.CONTENT_BASE_URL || BASE_URL;
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var morgan = require('morgan');
var errorhandler = require('errorhandler')
var routes = require('./routes')({
    contentBaseUrl : CONTENT_BASE_URL,
    testGlob : require('./testGlob')   //TODO : 本番環境時にはtestGlobを設定しないようにする
});
var path = require('path');
var mongoDao = require('./server/mongoDao');
var passport = require('passport');
var enemyRoutineDefine = require('./server/enemyRoutineDefine');
var app = express();

// all environments
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('combined'));
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
    app.use(errorhandler());
    app.use(express.static(path.join(__dirname, 'publicForTest')));
    app.use(express.static(path.join(__dirname, 'buildForTest')));
}

//DB
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/gbraver';
var dao = mongoDao({url : mongoUri});

//Passport
passport.serializeUser(function(user, done) {
    done(null, user);
});

//google OAuth2
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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

// twitter
var TwitterStrategy = require('passport-twitter');
passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: BASE_URL+'/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        /*
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return done(err, user);
        });
        */
        return done(null,profile);
    }
));

//routing
app.get('/', routes.root);
app.get('/logOff',routes.logOff);
if('development' == app.get('env')){
    app.get('/testClient',routes.testClient);
    app.get('/testList',routes.testList);
}

//routing google-oauth
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
            userid : user.emails[0].value
        };
        res.redirect('/');
    })(req, res, next);
});

//routing passport-twitter
app.get('/auth/twitter',
    passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        req.session.gbraver = {
            userid : 'twitter:'+req.user.username
        };
        res.redirect('/');
    });

//http server
var httpServer = app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//socket.io server
var server = require('./server/server.js');
var gameServer = server({
    httpServer : httpServer,
    dao : dao
});
gameServer.onGetAttackRoutine(enemyRoutineDefine.getAttackRoutine);
gameServer.onGetDefenseRoutine(enemyRoutineDefine.getDefenseRoutine);