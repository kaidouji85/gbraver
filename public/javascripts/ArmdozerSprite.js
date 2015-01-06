function ArmdozerSprite(spec,my) {
    var SPRITE_WIDTH = 160;
    var SPRITE_HEIGHT = 160;
    var EXPLOSION_WIDTH = 96;
    var EXPLOSION_HEIGHT = 96;
    var DEFAULT_X_FOR_DIRECTION_RIGHT = 170;
    var DEFAULT_Y_FOR_DIRECTION_RIGHT = 150;
    var DEFAULT_X_FOR_DIRECTION_LEFT = -10;
    var DEFAULT_Y_FOR_DIRECTION_LEFT = 150;
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
    that.doDownMotion = doDownMotion;
    init();

    function init() {
        that.image = pict;
        that.scaleX = direction===DIRECTION_RIGHT ? 1 : -1;
        doStandMotion();
    }

    function doAttackMotion(){
        that.frame = core.FRAME_ATTACK;
        that.tl.moveBy(-60*that.scaleX,0,8)
            .delay(20)
            .moveBy(-50*that.scaleX,0,5)
            .moveBy(50*that.scaleX,0,5);
    }

    function doHitMotion(){
        that.tl.delay(30)
            .then(function(){
                that.frame = core.FRAME_DAMAGE;
            }).delay(2).then(function(){
                core.assets[core.SOUND_ATTACK_HIT].play();
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
            .then(function(){
                core.assets[core.SOUND_ATTACK_MISS].play();
            })
            .moveBy(50*that.scaleX,50,5)
            .moveBy(-50*that.scaleX,-50,5);
    }

    function doMyTurnMotion(){
        that.frame = core.FRAME_ATTACK;
        that.tl.moveBy(-50*that.scaleX,0,5)
            .moveBy(50*that.scaleX,0,5);
    }

    function doDownMotion(){
        that.frame = core.FRAME_DAMAGE;
        that.tl.then(function(){
            var posx = that.x-SPRITE_WIDTH/2+rand(SPRITE_WIDTH);
            var posy = that.y-SPRITE_HEIGHT/2+rand(SPRITE_HEIGHT);
            core.currentScene.addChild(createExplosion(posx,posy));
            core.assets[core.SOUND_EXPLOSION].play();
        }).delay(4).loop();
        core.currentScene.tl.delay(120).then(function(){
            that.tl.clear();
            that.visible = false;
        });
    }

    function createExplosion(posx,posy) {
        var lexplosion = new Sprite(EXPLOSION_WIDTH,EXPLOSION_HEIGHT);
        lexplosion.image = core.assets[core.PICT_EXPLOSION];
        lexplosion.x = posx+EXPLOSION_WIDTH/2;
        lexplosion.y = posy+EXPLOSION_HEIGHT/2;
        lexplosion.scaleX = 2;
        lexplosion.scaleY = 2;
        lexplosion.frame = 0;
        lexplosion.opacity = 0.7;
        lexplosion.addEventListener(Event.ENTER_FRAME,function(){
            lexplosion.frame ++;
            if(lexplosion.frame > 12){
                core.currentScene.removeChild(lexplosion);
            }
        });
        return lexplosion;
    }

    return that;
}