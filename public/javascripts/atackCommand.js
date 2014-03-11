function atackCommand(spec,my){
    var ICON_WIDTH = 96;
    var ICON_HEIGHT = 30;
    
    var that = new Group();
    var atackImage = spec.atackImage;
    var chargeImage = spec.chargeImage;
    var atackIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    var chargeIcon = new Sprite(ICON_WIDTH,ICON_HEIGHT);
    
    atackIcon.image = atackImage;
    atackIcon.x = 0;
    atackIcon.y = 0;  
    that.addChild(atackIcon);
    
    chargeIcon.image = chargeImage;
    chargeIcon.x = 0;
    chargeIcon.y = 40;

    that.addChild(chargeIcon);
    
    that.onPushAtackButton = function(fnc){
        atackIcon.addEventListener(Event.TOUCH_START,fnc);   
    };
    
    that.onPushChargeButton = function(fnc){
        chargeIcon.addEventListener(Event.TOUCH_START,fnc);
    };
    
    that.setVisible = function(visible){
        for(var i in that.childNodes){
            that.childNodes[i].visible = visible;
        }
    };

    return that;
}
