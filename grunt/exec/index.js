var __ = require('underscore');

module.exports = function(mongo) {
    return {
        mongo: {
            cmd: 'mongo ' + mongo.product.url +
            ' -u '+mongo.product.user +
            ' -p'+ mongo.product.password +
            ' dbShell/createDB.js'
        },
        mongoBeta : {
            cmd: 'mongo ' + mongo.beta.url +
            ' -u '+mongo.beta.user +
            ' -p'+ mongo.beta.password +
            ' dbShell/createDB.js'
        },
        pushHeroku : {
            cmd : 'git push heroku master:master --force'
        },
        pushHerokuBeta : {
            cmd : 'git push beta develop:master --force'
        },
        test : {
            cmd : __.reduce([
                'battle',
                'enemyRoutine',
                'otherApi',
                'singlePlay',
                'twoPlay'], function(memo, now){
                return memo + 'mocha unitTest/'+ now + '/; ' }, '')
        }
    };
}