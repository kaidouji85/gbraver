var getTestFileEntries = require('./seleniumTest/getTestFileEntries');

module.exports = {
    entry: getTestFileEntries('srcForTest'),
    output: {
        path: './buildForTest/javascripts',
        filename: '[name]'
    },
    devtool: 'inline-source-map'
};