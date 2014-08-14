function pictButton(spec,my){
    var that = new Group();
    var text = spec.text;
    var pict = spec.pict;
    var buttonSprite = new Sprite(128,32);
    var buttonLabel = new Label(text);

    buttonSprite.image = pict;
    that.addChild(buttonSprite);

    buttonLabel.color = 'white';
    buttonLabel.x = (128 - buttonLabel._boundWidth)/2;
    buttonLabel.y = 10;
    that.addChild(buttonLabel);

    return that;
}