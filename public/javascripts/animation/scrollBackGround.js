function scrollBackGround(spec,my) {
    var that = new Group();
    var WIDTH = 320;
    var HEIGHT = 256;
    var MAX_ARRAY = 2;

    var pict = spec.pict;
    var speed = spec.speed;
    var backGroundArray = new Array(MAX_ARRAY);

    (function() {
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i] = createBackGround();
            backGroundArray[i].x = 0
            backGroundArray[i].y = -HEIGHT * i;
            backGroundArray[i].scaleY = i%2===0 ? 1 : -1;
            that.addChild(backGroundArray[i]);
        }
    })()

    that.setVisible = function(value){
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i].visible = value;
        }
    }

    function createBackGround() {
        var backGround = new Sprite(WIDTH,HEIGHT);
        backGround.image = pict;
        backGround.addEventListener(Event.ENTER_FRAME,function(e){
            backGround.y += speed;
            if(backGround.y < -HEIGHT) {
                backGround.y += HEIGHT*2;
            }
        });
        return backGround;
    }

    return that;
}