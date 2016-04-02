/**
 * Grunt設定ファイル
 */
module.exports = function(grunt) {
    var config = grunt.file.readJSON('./GruntConfig.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        s3: require('./grunt/s3')(config.s3),
        exec: require('./grunt/exec')(config.mongo),
        webpack: require('./grunt/webpack'),
        clean: require('./grunt/clean'),
    });

    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('deploy',['s3','exec:mongo','exec:pushHeroku']);
    grunt.registerTask('deployBeta',['exec:mongoBeta','exec:pushHerokuBeta']);
    grunt.registerTask('build', ['clean:product', 'webpack:product']);
    grunt.registerTask('buildTest', ['clean:test', 'webpack:test']);
    grunt.registerTask('buildClientTest', ['clean:clientTest', 'webpack:clientTest']);
    grunt.registerTask('watch', ['clean:product', 'webpack:watchProduct']);
    grunt.registerTask('watchTest', ['clean:test', 'webpack:watchTest']);
    grunt.registerTask('watchClientTest', ['clean:clientTest', 'webpack:watchClientTest']);
}