module.exports = {
    product: {
        files: ['src/**/*.js'],
        tasks: ['webpack:product']
    },
    test: {
        files: ['srcForTest/**/*.js'],
        tasks: ['webpack:product']
    }
};