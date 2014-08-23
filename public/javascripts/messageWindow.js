function messageWindow(spec,my){
    var SPRITE_WIDTH = 320;
    var SPRITE_HEIGHT = 96;
    var COLOR_WHITE = '#FFFFFF';

    var that = new Group();
    var pict = spec.pict;
    var windowSprite = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
    var messageLabel = new Label('');
    var visible = true;

    init();
    function init(){
        windowSprite.image = pict;
        windowSprite.opacity = 0.8;
        that.addChild(windowSprite);

        messageLabel.color = COLOR_WHITE;
        messageLabel.y = (SPRITE_HEIGHT - messageLabel._boundHeight)/2;
        that.addChild(messageLabel);
    }

    that.setText = function(text){
        messageLabel.text = text;
        messageLabel.x = (SPRITE_WIDTH - messageLabel._boundWidth)/2;
    }

    that.getText = function(){
        return messageLabel.text;
    }

    that.setVisible = function(value){
        visible = value;
        windowSprite.visible = visible;
        messageLabel.visible = visible;
    }

    that.getVisible = function() {
        return visible;
    }

    return that;
}