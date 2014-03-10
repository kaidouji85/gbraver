function atackCommand(spec,my){
    var ICON_WIDTH = 96;
    var ICON_HEIGHT = 30;
    
    var that = new Group();
    var atackImage = spec.atackImage;
    var chargeImage = spec.chargeImage;
    var atackIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var chargeIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var emitPushAtackButton;
    var emitPushChargeButton;
    
    atackIcon.image = atackImage;
    atackIcon.x = 0;
    atackIcon.y = 0;
    atackIcon.addEventListener(Event.TOUCH_START,function(e){
        emitPushAtackButton();
    });    
    that.addChild(atackIcon);
    
    chargeIcon.image = chargeImage;
    chargeIcon.x = 0;
    chargeIcon.y = 40;
    chargeIcon.addEventListener(Event.TOUCH_START,function(e){
        emitPushChargeButton();
    });
    that.addChild(chargeIcon);
    
    that.onPushAtackButton = function(fnc){
        emitPushAtackButton = fnc;
    };
    
    that.onPushChargeButton = function(fnc){
        emitPushChargeButton = fnc;
    };

    return that;
}
