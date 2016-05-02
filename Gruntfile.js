var __ = require('underscore');

/**
 * Grunt設定ファイル
 *
 * コマンドライン引数
 *      --env 実行環境
 *         heroku heroku環境
 *         指定なし ローカル環境
 *      --target ビルド対象のファイル
 */
module.exports = function(grunt) {
    // 全環境共通設定
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: require('./grunt/webpack')(grunt.option('target')),
        clean: require('./grunt/clean'),
    });

    // ローカル環境の場合、認証情報が必要なタスクを追加する
    if (grunt.option('env') !== 'heroku') {
        var config = grunt.file.readJSON('./GruntConfig.json');
        grunt.config.merge({
            aws_s3: require('./grunt/aws_s3')(config.s3),
            exec: require('./grunt/exec')(config.mongo),
        });
    }

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-aws-s3');

    // 本番環境にデプロイする
    // ローカル環境から実行すること
    grunt.registerTask(
        'deploy',[
            'aws_s3:cleanProduct',
            'aws_s3:uploadProduct',
            'buildDb',
            'exec:mongo',
            'exec:pushHeroku']);

    // ベータ環境にデプロイする
    // ローカル環境から実行すること
    grunt.registerTask(
        'deployBeta',[
            'buildDb',
            'exec:mongoBeta',
            'exec:pushHerokuBeta']);

    // ローカルDBにマスタデータを反映する
    grunt.registerTask('mongoLocal',[
        'buildDb',
        'exec:mongoLocal'
    ]);
    
    // ビルド関連のタスク
    grunt.registerTask('build', ['clean:product', 'webpack:product']);
    grunt.registerTask('buildTest', ['clean:test', 'webpack:test']);
    grunt.registerTask('buildClientTest', ['clean:clientTest', 'webpack:clientTest']);
    grunt.registerTask('buildDb', ['clean:db', 'webpack:db']);
    grunt.registerTask('watch', ['clean:product', 'webpack:watchProduct']);
    grunt.registerTask('watchTest', ['clean:test', 'webpack:watchTest']);
    grunt.registerTask('watchClientTest', ['clean:clientTest', 'webpack:watchClientTest']);
}