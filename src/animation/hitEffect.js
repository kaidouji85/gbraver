module.exports = function(spec,my){
    var that = new Sprite(256,256);
    var pict = spec.pict;

    that.image = pict;
    that.visible = false;
    that.frame = 0;

    that.play = function(){
        that.visible = true;
        that.frame = 0;

        that.tl.delay(30);
        for(var i=0; i<10; i++){
            that.tl.delay(3).then(function(){
                that.frame ++;
            });
        }
        that.tl.delay(3).then(function(){
            that.visible = false;
        });
    }

    return that;
}