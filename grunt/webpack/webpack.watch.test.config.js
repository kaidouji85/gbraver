var testConfig = require('./webpack.test.config');
var __ = require('underscore');

module.exports = __.extend({}, testConfig, {
    cache: true,
    watch: true,
    keepalive: true
});