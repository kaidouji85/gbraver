/**
 * heroku用のgrunt設定ファイル
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: require('./grunt/webpack'),
        clean: require('./grunt/clean'),
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('build', ['clean:product', 'webpack:product']);
};