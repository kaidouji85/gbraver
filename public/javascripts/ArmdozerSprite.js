function ArmdozerSprite(spec,my) {
    var SPRITE_WIDTH = 128;
    var SPRITE_HEIGHT = 128;
    var DEFAULT_X_FOR_DIRECTION_RIGHT = 192;
    var DEFAULT_Y_FOR_DIRECTION_RIGHT = 80;
    var DEFAULT_X_FOR_DIRECTION_LEFT = 0;
    var DEFAULT_Y_FOR_DIRECTION_LEFT = 80;
    var DIRECTION_RIGHT = 'right';
    var MOTION_STAND = 0;
    var MOTION_ATTACK = 1;
    var MOTION_DAMAGE = 2;

    var that = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
    var pict = spec.pict;
    var direction = spec.direction;

    that.doAttackMotion = doAttackMotion;
    that.doHitMotion = doHitMotion;
    that.doStandMotion = doStandMotion;
    that.doAvoidMotion = doAvoidMotion;
    init();

    function init() {
        that.image = pict;
        that.originX = SPRITE_WIDTH/2;
        that.originY = SPRITE_HEIGHT/2;
        that.scaleX = direction===DIRECTION_RIGHT ? 1 : -1;
        doStandMotion();
    }

    function doAttackMotion(){
        that.frame = MOTION_ATTACK;
        that.tl.moveBy(-100*that.scaleX,0,10)
            .delay(20)
            .moveBy(-50*that.scaleX,0,5)
            .moveBy(50*that.scaleX,0,5);
    }

    function doHitMotion(){
        that.tl.delay(30)
            .then(function(){
                that.frame = MOTION_DAMAGE;
            })
            .moveBy(10*that.scaleX,0,2)
            .moveBy(-10*that.scaleX,0,2);
    }

    function doStandMotion(){
        that.x = direction===DIRECTION_RIGHT ? DEFAULT_X_FOR_DIRECTION_RIGHT : DEFAULT_X_FOR_DIRECTION_LEFT;
        that.y = direction===DIRECTION_RIGHT ? DEFAULT_Y_FOR_DIRECTION_RIGHT : DEFAULT_Y_FOR_DIRECTION_LEFT;
        that.frame = MOTION_STAND;
    }

    function doAvoidMotion(){
        that.tl.delay(31)
            .moveBy(50*that.scaleX,50,5)
            .moveBy(-50*that.scaleX,-50,5);
    }

    return that;
}