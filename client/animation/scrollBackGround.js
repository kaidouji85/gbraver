var scrollObject = require('./scrollObject');

module.exports = function(spec,my) {
    var that = new Group();
    var WIDTH = 320;
    var HEIGHT = 256;
    var MAX_ARRAY = 2;

    var pict = spec.pict;
    var backGroundArray = new Array(MAX_ARRAY);

    (function() {
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i] = scrollObject({
                pict : pict,
                width : WIDTH,
                height : HEIGHT
            });
            backGroundArray[i].x = i * WIDTH;
            backGroundArray[i].y = 0;
            backGroundArray[i].scaleX = i%2===0 ? 1 : -1;
            that.addChild(backGroundArray[i]);
        }
    })()

    that.setSpeed = function(pSpeed){
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i].setSpeed(pSpeed);
        }
    }

    that.setVisible = function(value){
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i].visible = value;
        }
    }

    that.setOpacity = function(opacity) {
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i].opacity = opacity;
        }
    }

    return that;
}