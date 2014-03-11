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
        
    plusIcon.image = plusImage;
    plusIcon.x = 0;
    plusIcon.y = 0;
    that.addChild(plusIcon);
    
    minusIcon.image = minusImage;
    minusIcon.x = 0;
    minusIcon.y = 40;
    that.addChild(minusIcon);
    
    okIcon.image = okImage;
    okIcon.x = 0;
    okIcon.y =80;
    that.addChild(okIcon);
    
    that.onPushPlusButton = function(fnc){
        plusIcon.addEventListener(Event.TOUCH_START,fnc);
    };
    
    that.onPushMinuxButton = function(fnc){
        minusIcon.addEventListener(Event.TOUCH_START,fnc);    
    };
    
    that.onPushOkButton = function(fnc){
        okIcon.addEventListener(Event.TOUCH_START,fnc); 
    };

    that.setVisible = function(visible){
        for(var i in that.childNodes){
            that.childNodes[i].visible = visible;
        }
    };
        
    return that;
}
