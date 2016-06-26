var webpack = require('../webpack')();

module.exports = {
    product: [webpack.product.output.path + webpack.product.output.filename],
    gameTest: [webpack.gameTest.output.path],
    unitTest: [webpack.unitTest.output.path],
    db: [webpack.db.output.path]
}