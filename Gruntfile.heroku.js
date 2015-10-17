module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: require('./grunt/webpack')
    });
    grunt.loadNpmTasks('grunt-webpack');
};