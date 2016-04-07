module.exports = function(spec,my){
    var that = new Group();
    var barImage = spec.barImage;
    var direction = spec.direction;
    var maxValue = spec.maxValue || barImage.width;
    var height = spec.height || 16;
    var backImage = spec.backImage;
    var mainBar = new Sprite(maxValue,height);
    var backBar = new Sprite(maxValue,height);
    var value = 0;
    var turn = 0;
    var speed = 0;

    (function(){
        backBar.image = backImage;
        backBar.x = getBarX(maxValue);
        backBar.scaleX = (direction==='right' ? 1 : -1);
        that.addChild(backBar);

        mainBar.image = barImage;
        mainBar.x = 0;
        mainBar.scaleX = (direction==='right' ? 1 : -1);
        that.addChild(mainBar);
    })()

    that.plus = function(p_turn,p_speed){
        turn = p_turn;
        speed = p_speed;
    }

    that.setValue = function(p_value){
        value = p_value;
        fixBarWidth();
    }

    that.getValue = function(){
        return value;
    }

    that.addEventListener('enterframe', function(e) {
        if (turn > 0) {
            value += speed;
            turn--;
        }
        fixBarWidth();
    });

    that.setVisible = function(value){
        mainBar.visible = value;
        backBar.visible = value;
    }

    that.getMaxValue = function(){
        return maxValue;
    }

    function fixBarWidth(){
        var width = value;
        if(width > maxValue){
            width = maxValue;
        } else if(width < 0) {
            width = 0;
        }
        mainBar.width = width;
        mainBar.x = getBarX(width);
    }

    function getBarX(width) {
        return direction==='right' ? 0 : -width;
    }

    return that;
}