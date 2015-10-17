module.exports = function(s3) {
    return {
        options: {
            key: s3.key,
            secret: s3.secret,
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
    };
}