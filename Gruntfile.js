module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        s3auth: grunt.file.readJSON('s3auth.json'),
        s3: {
            options: {
                key: '<%= s3auth.key %>',
                secret: '<%= s3auth.secret %>',
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
        }
    });

    grunt.loadNpmTasks('grunt-s3');
    grunt.registerTask('upload', 's3');
};