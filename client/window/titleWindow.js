var gridWindow = require('../window/gridWindow');

module.exports = function(spec,my){
    var that = new Group();
    var COLOR_WHITE = '#FFFFFF';
    var pict = spec.pict;
    var text = spec.text;
    var window = gridWindow({
        pict : pict,
        width : 20,
        height : 2
    });
    var titleLabel = new Label(text);
    var visible = true;

    init();
    function init() {
        window.x = 0;
        window.y = 0;
        that.addChild(window);

        titleLabel.color = COLOR_WHITE;
        titleLabel.x = (320 - titleLabel._boundWidth)/2;
        titleLabel.y = (32 - titleLabel._boundHeight)/2;
        that.addChild(titleLabel);
    }

    that.setVisible = function(value){
        visible = value;
        window.setVisible(value);
        titleLabel.visible = value;
    }

    that.getVisible = function(){
        return visible;
    }

    return that;
}