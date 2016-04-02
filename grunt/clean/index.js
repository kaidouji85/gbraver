var product = require('../webpack/product');
var test = require('../webpack/test')
var clientTest = require('../webpack/clientTest');

module.exports = {
    product: [product.output.path + product.output.filename],
    test: [test.output.path],
    clientTest: [clientTest.output.path]
}