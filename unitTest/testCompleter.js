function testCompleter(spec,my) {
    var that = {};
    var done = spec.done;
    var completes = {};


    that.completeClient = function(index) {
        completes[index] = "";
        if(isFinishTest()){
            done();
        }
    }

    function isFinishTest() {
        if(Object.keys(completes).length === 2) {
            return true;
        } else {
            return false;
        }
    }

    return that;
};

module.exports = testCompleter;