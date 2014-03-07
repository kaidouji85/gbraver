function batteryMertor(spec,my){
    var WIDTH = 24;
    var HEIGHT = 16;
    var BACK_WIDTH = 120;
    var MAX_BATTERY = 5;
    
    var that = new Group();
    var gaugeImage = spec.gaugeImage;
    var backImage = spec.backImage;
    var direction = spec.direction;
    var batteryArray = [];
    var batteryBack = new Sprite(BACK_WIDTH,HEIGHT);
    
    batteryBack.image = backImage;
    that.addChild(batteryBack);
    
    for(var i=0; i<MAX_BATTERY; i++){
        batteryArray[i] = new Sprite(WIDTH,HEIGHT);
        batteryArray[i].image = gaugeImage;
        batteryArray[i].x = direction==='right' ? WIDTH*i : WIDTH*(MAX_BATTERY-1)-WIDTH*i;
        that.addChild(batteryArray[i]);
    }
    
    that.setValue = function(value){
        for(var i=0; i<MAX_BATTERY; i++){
            batteryArray[i].visible = i<value ? true : false;
        }

    };
    
    return that;
}