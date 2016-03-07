var GruntFileHeroku = require('./GruntFile.heroku');

module.exports = function (grunt) {
    GruntFileHeroku(grunt);
    GruntFile(grunt);
};

function GruntFile(grunt) {
    var config = grunt.file.readJSON('./GruntConfig.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        s3: require('./grunt/s3')(config.s3),
        exec: require('./grunt/exec')(config.mongo),
        webpack: require('./grunt/webpack'),
    });

    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('deploy',['s3','exec:mongo','exec:pushHeroku']);
    grunt.registerTask('deployBeta',['exec:mongoBeta','exec:pushHerokuBeta']);
}