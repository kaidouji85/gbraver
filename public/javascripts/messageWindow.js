function messageWindow(spec,my){
    var SPRITE_WIDTH = 320;
    var SPRITE_HEIGHT = 96;
    var COLOR_WHITE = '#FFFFFF';

    var that = new Group();
    var pict = spec.pict;
    var width = spec.width || SPRITE_WIDTH;
    var height = spec.height || SPRITE_HEIGHT;
    var windowSprite = gridWindow({
        pict : pict,
        width : width/32,
        height : height/32,
        spriteWidth : 32,
        spriteHeight : 32
    });
    var messageLabel = new Label('');
    var visible = true;

    init();
    function init(){
        that.addChild(windowSprite);
        messageLabel.color = COLOR_WHITE;
        that.addChild(messageLabel);
    }

    that.setText = function(text){
        messageLabel.text = text;
        messageLabel.x = (width - messageLabel._boundWidth)/2;
        messageLabel.y = (height - messageLabel._boundHeight)/2;
    }

    that.getText = function(){
        return messageLabel.text;
    }

    that.setVisible = function(value){
        visible = value;
        windowSprite.setVisible(visible);
        messageLabel.visible = visible;
    }

    that.getVisible = function() {
        return visible;
    }

    return that;
}