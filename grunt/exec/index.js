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
            cmd : 'git push heroku'
        },
        pushHerokuBeta : {
            cmd : 'git push beta development:master'
        }
    };
}