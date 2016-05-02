var webpack = require('../webpack');

module.exports = {
    product: [webpack.product.output.path + webpack.product.output.filename],
    test: [webpack.test.output.path],
    clientTest: [webpack.clientTest.output.path]
}