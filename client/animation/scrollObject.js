module.exports = function(spec,my) {
    var WIDTH = spec.width;
    var HEIGHT = spec.height;
    var pict = spec.pict;
    var speed = 0;

    var that = new Sprite(WIDTH,HEIGHT);
    that.image = pict;

    that.addEventListener(Event.ENTER_FRAME,function(e){
        that.x += speed;
        if(that.x < -WIDTH) {
            that.x += WIDTH*2;
        } else if(that.x > WIDTH) {
            that.x -= WIDTH*2;
        }
    });

    that.setSpeed = function(pSpeed){
        speed = pSpeed;
    }

    return that;
}