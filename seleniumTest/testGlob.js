var glob = require('glob');

function testGlob() {
    var that = {};

    that.glob = function(dir){
        var ret = glob.sync('**/'+dir+'/**/*Test.js');
        return ret;
    }
    return that;
}

module.exports = testGlob;