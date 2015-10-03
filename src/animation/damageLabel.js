var pictNumber = require('./pictNumber');

module.exports = function(spec,my){
    spec.height = 32;
    spec.width = 32;
    var that = pictNumber(spec);

    return that;
}