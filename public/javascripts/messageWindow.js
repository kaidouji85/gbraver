function messageWindow(spec,my){
    var SPRITE_WIDTH = 320;
    var SPRITE_HEIGHT = 96;
    var COLOR_WHITE = '#FFFFFF';

    var that = new Group();
    var pict = spec.pict;
    var windowSprite = gridWindow({
        pict : pict,
        width : SPRITE_WIDTH/16,
        height : SPRITE_HEIGHT/16
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
        messageLabel.x = (SPRITE_WIDTH - messageLabel._boundWidth)/2;
        messageLabel.y = (SPRITE_HEIGHT - messageLabel._boundHeight)/2;
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