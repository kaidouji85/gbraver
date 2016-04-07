module.exports = function(spec,my){
    var that = new Sprite(64,64);
    that.image = spec.pict;

    that.playOpenBatteryAnime = function(){
        that.scaleX = 1;
        that.scaleY = 1;
        that.opacity = 0;
        that.tl.fadeIn(15).and().scaleTo(2,2,15).delay(15).scaleTo(1,1,15);
    }


    return that;
}