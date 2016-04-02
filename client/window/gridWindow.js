module.exports = function(spec,my){
    var that = new Group();
    var OPACITY = 1;

    var pict = spec.pict;
    var width = spec.width;
    var height = spec.height;
    var SPRITE_WIDTH = spec.spriteWidth || 16;
    var SPRITE_HEIGHT = spec.spriteHeight || 16;

    init();
    function init(){
        var windowUpperLeft = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
        windowUpperLeft.image = pict;
        windowUpperLeft.opacity = OPACITY;
        that.addChild(windowUpperLeft);

        var windowUpperRight = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
        windowUpperRight.image = pict;
        windowUpperRight.opacity = OPACITY;
        windowUpperRight.frame = 2;
        windowUpperRight.x = SPRITE_WIDTH * (width-1);
        that.addChild(windowUpperRight);

        var windowLowerLeft = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
        windowLowerLeft.image = pict;
        windowLowerLeft.opacity = OPACITY;
        windowLowerLeft.frame = 6;
        windowLowerLeft.y = SPRITE_HEIGHT * (height-1);
        that.addChild(windowLowerLeft);

        var windowLowerRight = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
        windowLowerRight.image = pict;
        windowLowerRight.opacity = OPACITY;
        windowLowerRight.frame = 8;
        windowLowerRight.x = SPRITE_WIDTH * (width-1);
        windowLowerRight.y = SPRITE_HEIGHT * (height-1);
        that.addChild(windowLowerRight);

        for(var x=1; x<width-1; x++){
            var upper = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
            upper.image = pict;
            upper.opacity = OPACITY;
            upper.x = x*SPRITE_WIDTH;
            upper.frame = 1;
            that.addChild(upper);

            var lower = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
            lower.image = pict;
            lower.opacity = OPACITY;
            lower.x = x*SPRITE_WIDTH;
            lower.y = SPRITE_HEIGHT * (height - 1);
            lower.frame = 7;
            that.addChild(lower);
        }

        for(var y=1; y<height-1; y++) {
            var left = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
            left.image = pict;
            left.opacity = OPACITY;
            left.x = 0;
            left.y = y * SPRITE_HEIGHT;
            left.frame = 3;
            that.addChild(left);

            var right = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
            right.image = pict;
            right.opacity = OPACITY;
            right.x = SPRITE_WIDTH * (width-1);
            right.y = y * SPRITE_HEIGHT;
            right.frame = 5;
            that.addChild(right);
        }

        for(x=1; x<width-1; x++){
            for(y=1; y<height-1; y++) {
                var center = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
                center.image = pict;
                center.opacity = OPACITY;
                center.x = x*SPRITE_WIDTH;
                center.y = y*SPRITE_HEIGHT;
                center.frame = 4;
                that.addChild(center);
            }
        }
    }

    that.setVisible = function(value){
        for(var i=0; i<that.childNodes.length; i++){
            that.childNodes[i].visible = value;
        }
    }

    that.setPict = function(pictData) {
        for(var i=0; i<that.childNodes.length; i++){
            that.childNodes[i].image = pictData;
        }
    }

    that.setOpacity = function(opacity){
        for(var i=0; i<that.childNodes.length; i++){
            that.childNodes[i].opacity = opacity;
        }
    }

    return that;
}