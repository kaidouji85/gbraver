function pictButton(spec,my){
    var that = new Group();
    var text = spec.text;
    var pict = spec.pict;
    var visible = true;
    var COLOR_WHITE = '#FFFFFF';
    var COLOR_GRAY = '#708090';
    var BUTTON_WIDTH = 128;
    var BUTTON_HEIGHT = 32;
    var buttonSprite = new Sprite(BUTTON_WIDTH,BUTTON_HEIGHT);
    var buttonLabel = new Label(text);

    buttonSprite.image = pict;
    that.addChild(buttonSprite);

    buttonLabel.color = COLOR_WHITE;
    buttonLabel.x = (BUTTON_WIDTH - buttonLabel._boundWidth)/2;
    buttonLabel.y = (BUTTON_HEIGHT - buttonLabel._boundHeight)/2;
    that.addChild(buttonLabel);

    that.setVisible = function(value){
        visible = value;
        buttonSprite.visible = visible;
        buttonLabel.visible = visible;
    }

    that.getVisible = function() {
        return visible;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        buttonLabel.color = COLOR_GRAY;
        buttonSprite.frame = 1;
    });

    that.addEventListener(Event.TOUCH_END,function(){
        buttonLabel.color = COLOR_WHITE;
        buttonSprite.frame = 0;
    });

    return that;
}