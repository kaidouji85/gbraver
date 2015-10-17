module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gruntConfig: grunt.file.readJSON('./GruntConfig.json'),
        s3: {
            options: {
                key: '<%= gruntConfig.s3.key %>',
                secret: '<%= gruntConfig.s3.secret %>',
                region: 'ap-northeast-1',
                bucket: 'gbraver-aws',
                access: 'public-read'
            },
            gbraver: {
                upload: [
                    { src: 'public/images/*', dest: 'images' },
                    { src: 'public/sound/*', dest: 'sound' }
                ]
            }
        },
        exec: {
            mongo: {
                cmd: 'mongo <%= gruntConfig.mongo.url %> '+
                        '-u <%= gruntConfig.mongo.user %> '+
                        '-p<%= gruntConfig.mongo.password %> '+
                        'dbShell/createDB.js'
            },
            mongoBeta : {
                cmd: 'mongo <%= gruntConfig.mongoBeta.url %> '+
                        '-u <%= gruntConfig.mongoBeta.user %> '+
                        '-p<%= gruntConfig.mongoBeta.password %> '+
                        'dbShell/createDB.js'
            },
            pushHeroku : {
                cmd : 'git push heroku'
            },
            pushHerokuBeta : {
                cmd : 'git push beta development:master'
            }
        },
        webpack: require('./grunt/webpack')
    });

    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('deploy',['s3','exec:mongo','exec:pushHeroku']);
    grunt.registerTask('deployBeta',['exec:mongoBeta','exec:pushHerokuBeta']);
};