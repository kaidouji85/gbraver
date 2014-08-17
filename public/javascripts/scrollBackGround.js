function scrollBackGround(spec,my) {
    var that = new Group();
    var WIDTH = 320;
    var MAX_ARRAY = 2;

    var pict = spec.pict;
    var speed = spec.speed;
    var height = spec.height;
    var backGroundArray = new Array(MAX_ARRAY);

    init();
    function init() {
        for(var i=0; i<MAX_ARRAY; i++) {
            backGroundArray[i] = createBackGround();
            backGroundArray[i].x = -WIDTH*i;
            that.addChild(backGroundArray[i]);
        }
    }

    function createBackGround() {
        var backGround = new Sprite(WIDTH,height);
        backGround.image = pict;
        backGround.addEventListener(Event.ENTER_FRAME,function(e){
            backGround.x += speed;
            if(backGround.x > WIDTH) {
                backGround.x -= WIDTH*2;
            }
        });
        return backGround;
    }

    return that;
}