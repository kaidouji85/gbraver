module.exports = function(spec,my) {
    var WIDTH = spec.width || 320;
    var HEIGHT = spec.height || 256;
    var image = spec.image;
    var core = enchant.Core.instance;

    var that = new Sprite(WIDTH,HEIGHT);
    that.image = image;

    that.play = function() {
        var dir = that.scaleX>0 ? 1 : -1;
        var targetX = dir>0 ? core.width - that.width : 0;
        that.y = 80;
        that.x = dir>0 ? core.width - that.width/2 : -that.width/2;
        that.tl.moveTo(targetX,80,10);
        that.tl.delay(10).then(function(){
            core.assets[core.SOUND_WAKE_UP].play();
        });
    }

    return that;
}