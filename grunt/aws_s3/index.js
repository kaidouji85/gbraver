module.exports = function(s3) {
    return {
        options: {
            accessKeyId: s3.key,
            secretAccessKey: s3.secret,
            access: 'public-read',
            region: 'ap-northeast-1',
            bucket: 'gbraver-aws'
        },
        cleanProduct: {
            files: [
                {dest: 'images/', action: 'delete'},
                {dest: 'sound/', action: 'delete'},
            ]
        },
        uploadProduct: {
            files: [
                {expand: true, cwd: 'public/images/', src: ['**'], dest: 'images/', action: 'upload'},
                {expand: true, cwd: 'public/sound/', src: ['**'], dest: 'sound/', action: 'upload'},
            ]
        }
    };
}