function customBar(spec, my) {
    var that = new Group();
    var barImage = spec.barImage;
    var direction = spec.direction;
    var maxValue = spec.maxValue;
    var backImage = spec.backImage;
    var MainBar = mainBar({
        image : barImage,
        direction : direction,
        maxValue : maxValue
    });
    var BarBack = barBack({
        image : backImage,
        direction : direction,
        maxValue : maxValue
    });
    
    that.addChild(BarBack);
    that.addChild(MainBar);
    
    that.plus = MainBar.plus;
    that.setValue = MainBar.setValue;
    that.getValue = MainBar.getValue;
    
    return that;
};

function mainBar(spec, my) {
    var that = new Bar(0, 0);
    var image = spec.image;
    var direction = spec.direction;
    var maxValue = spec.maxValue;
    var turn = 0;
    var speed = 0;

    that.value = 0;
    that.image = image;
    that.direction = direction;
    that.maxValue = maxValue;

    that.plus = function(p_turn, p_speed) {
        turn = p_turn;
        speed = p_speed;
    };

    that.addEventListener('enterframe', function(e) {
        if (turn > 0) {
            //that.value += speed;
            that.setValue(that.value + speed);
            turn--;
        }
    });
    
    that.setValue = function(value){
        if(maxValue<value) {
           value=maxValue; 
        }
        that.value = value;        
    };

    that.getValue = function(){
        return that.value;
    }

    return that;
}

function barBack(spec,my){
    var that = new Sprite(spec.maxValue+2,18);
    var maxValue = spec.maxValue;
    var direction = spec.direction;
    var image = spec.image;
    
    that.image = image;
    that.x = (direction==='right' ? -1 : -maxValue-1);
    that.y = -1;
    
    return that;
}
