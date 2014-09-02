function pictButton(spec,my){
    var that = new Group();
    var text = spec.text;
    var pict = spec.pict;
    var visible = true;
    var COLOR_WHITE = '#FFFFFF';
    var COLOR_GRAY = '#FAFAFA';
    var BUTTON_WIDTH = 9;
    var BUTTON_HEIGHT = 3;
    var buttonWindow = gridWindow({
        pict : pict,
        width : BUTTON_WIDTH,
        height : BUTTON_HEIGHT
    });
    var buttonLabel = new Label(text);

    that.addChild(buttonWindow);
    buttonLabel.color = COLOR_WHITE;
    buttonLabel.x = (BUTTON_WIDTH*16 - buttonLabel._boundWidth)/2;
    buttonLabel.y = (BUTTON_HEIGHT*16 - buttonLabel._boundHeight)/2;
    that.addChild(buttonLabel);

    that.setVisible = function(value){
        visible = value;
        buttonWindow.setVisible(visible);
        buttonLabel.visible = visible;
    }

    that.getVisible = function() {
        return visible;
    }

    that.getText = function() {
        return buttonLabel.text;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        buttonLabel.color = COLOR_GRAY;
        //TODO : buttonWindowを明るくする
    });

    that.addEventListener(Event.TOUCH_END,function(){
        buttonLabel.color = COLOR_WHITE;
        //TODO : buttonWindowを暗くする
    });

    return that;
}