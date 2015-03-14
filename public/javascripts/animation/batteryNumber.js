function batteryNumber(spec,my){
    var that = new Sprite(64,64);
    that.image = spec.pict;

    that.playOpenBatteryAnime = function(){
        that.scaleX = 4;
        that.scaleY = 4;
        that.opacity = 0.4;
        that.tl.scaleTo(1,1,5).and().fadeIn(5);
    }


    return that;
}