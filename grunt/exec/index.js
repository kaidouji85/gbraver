var __ = require('underscore');
var DB_SHELL_PATH = 'dbShell/build/index.js';

module.exports = function(mongo) {
    return {
        mongo: {
            cmd: 'mongo ' + mongo.product.url +
            ' -u '+mongo.product.user +
            ' -p'+ mongo.product.password +
            ' ' + DB_SHELL_PATH
        },
        mongoBeta : {
            cmd: 'mongo ' + mongo.beta.url +
            ' -u '+mongo.beta.user +
            ' -p'+ mongo.beta.password +
            ' ' + DB_SHELL_PATH
        },
        mongoLocal: {
            cmd: 'mongo localhost/gbraver ' + DB_SHELL_PATH
        },
        pushHeroku : {
            cmd : 'git push heroku master:master --force'
        },
        pushHerokuBeta : {
            cmd : 'git push beta `git rev-parse --abbrev-ref HEAD`:master --force'
        },
        test : {
            cmd : __.reduce([
                'battle',
                'enemyRoutine',
                'otherApi',
                'singlePlay',
                'twoPlay'], function(memo, now){
                return memo + 'mocha --reporter progress test/server/'+ now + '/; ' }, '')
        }
    };
}