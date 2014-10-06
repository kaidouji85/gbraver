function ArmdozerSprite(spec,my) {
    var SPRITE_WIDTH = 160;
    var SPRITE_HEIGHT = 160;
    var DEFAULT_X_FOR_DIRECTION_RIGHT = 170;
    var DEFAULT_Y_FOR_DIRECTION_RIGHT = 110;
    var DEFAULT_X_FOR_DIRECTION_LEFT = -10;
    var DEFAULT_Y_FOR_DIRECTION_LEFT = 110;
    var DIRECTION_RIGHT = 'right';

    var that = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
    var pict = spec.pict;
    var direction = spec.direction;
    var core = enchant.Core.instance;

    that.doAttackMotion = doAttackMotion;
    that.doHitMotion = doHitMotion;
    that.doStandMotion = doStandMotion;
    that.doAvoidMotion = doAvoidMotion;
    that.doMyTurnMotion = doMyTurnMotion;
    init();

    function init() {
        that.image = pict;
        that.scaleX = direction===DIRECTION_RIGHT ? 1 : -1;
        doStandMotion();
    }

    function doAttackMotion(){
        that.frame = core.FRAME_ATTACK;
        that.tl.moveBy(-80*that.scaleX,0,8)
            .delay(20)
            .moveBy(-50*that.scaleX,0,5)
            .moveBy(50*that.scaleX,0,5);
    }

    function doHitMotion(){
        that.tl.delay(30)
            .then(function(){
                that.frame = core.FRAME_DAMAGE;
            })
            .moveBy(10*that.scaleX,0,2)
            .moveBy(-10*that.scaleX,0,2);
    }

    function doStandMotion(){
        that.x = direction===DIRECTION_RIGHT ? DEFAULT_X_FOR_DIRECTION_RIGHT : DEFAULT_X_FOR_DIRECTION_LEFT;
        that.y = direction===DIRECTION_RIGHT ? DEFAULT_Y_FOR_DIRECTION_RIGHT : DEFAULT_Y_FOR_DIRECTION_LEFT;
        that.frame = core.FRAME_STAND;
    }

    function doAvoidMotion(){
        that.tl.delay(31)
            .moveBy(50*that.scaleX,50,5)
            .moveBy(-50*that.scaleX,-50,5);
    }

    function doMyTurnMotion(){
        that.frame = core.FRAME_ATTACK;
        that.tl.moveBy(-50*that.scaleX,0,5)
            .moveBy(50*that.scaleX,0,5);
    }

    return that;
}