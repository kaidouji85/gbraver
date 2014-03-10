function batteryCommand(spec,my) {
    var ICON_WIDTH = 96;
    var ICON_HEIGHT = 30;    
    
    var that = new Group();
    var plusImage = spec.plusImage;
    var minusImage = spec.minusImage;
    var okImage = spec.okImage;
    var plusIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var minusIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var okIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var emitPushPlusButton; 
    var emitPushMinuxButton;
    var emitPushOkButton;
        
    plusIcon.image = plusImage;
    plusIcon.x = 0;
    plusIcon.y = 0;
    plusIcon.addEventListener(Event.TOUCH_START,function(e){
        emitPushPlusButton();
    });
    that.addChild(plusIcon);
    
    minusIcon.image = minusImage;
    minusIcon.x = 0;
    minusIcon.y = 40;
    minusIcon.addEventListener(Event.TOUCH_START,function(e){
        emitPushMinuxButton();
    });    
    that.addChild(minusIcon);
    
    okIcon.image = okImage;
    okIcon.x = 0;
    okIcon.y =80;
    okIcon.addEventListener(Event.TOUCH_START,function(e){
        emitPushOkButton();
    });    
    that.addChild(okIcon);
    
    that.onPushPlusButton = function(fnc){
        emitPushPlusButton = fnc;
    };
    
    that.onPushMinuxButton = function(fnc){
        emitPushMinuxButton = fnc;
    };
    
    that.onPushOkButton = function(fnc){
        emitPushOkButton = fnc;
    };

    
    return that;
}
