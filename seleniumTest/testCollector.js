var glob = require('glob');

function testCollector() {
    var that = {};

    that.collect = function(dir,fn){
        glob('**/'+dir+'/**/*Test.js',resultOfGlob);

        function resultOfGlob(err,files){
            fn(null,files);
        }
    }
    return that;
}

module.exports = testCollector;