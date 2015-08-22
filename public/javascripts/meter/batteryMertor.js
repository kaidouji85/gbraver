function batteryMertor(spec,my){
    var MAX_BATTERY = 5;
    var core = enchant.Core.instance;
    
    var that = new Group();
    var gaugeImage = spec.gaugeImage;
    var backImage = spec.backImage;
    var direction = spec.direction;
    var WIDTH = gaugeImage.width || 24;
    var HEIGHT = gaugeImage.height || 16;
    var BACK_WIDTH = backImage.width || 120;

    var batteryArray = [];
    var batteryBack = new Sprite(BACK_WIDTH,HEIGHT);
    var value;
    
    batteryBack.image = backImage;
    that.addChild(batteryBack);
    
    for(var i=0; i<MAX_BATTERY; i++){
        batteryArray[i] = new Sprite(WIDTH,HEIGHT);
        batteryArray[i].image = gaugeImage;
        batteryArray[i].x = direction==='right' ? WIDTH*i : WIDTH*(MAX_BATTERY-1)-WIDTH*i;
        that.addChild(batteryArray[i]);
    }
    
    that.setValue = function(Lvalue){
        value = Lvalue;
        for(var i=0; i<MAX_BATTERY; i++){
            batteryArray[i].visible = i<value ? true : false;
        }
    };
    
    that.getValue = function(){
        return value;
    };
    
    return that;
}