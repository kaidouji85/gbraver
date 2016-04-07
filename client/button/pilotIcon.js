var gridWindow = require('../window/gridWindow');

module.exports = function(spec,my){
    var that = new Group();
    var core = enchant.Core.instance;
    var windowPict = spec.windowPict;
    var pilotPict = spec.pilotPict;
    var width = spec.width || 5;
    var height = spec.height || 5;
    var scaleX = spec.scaleX || 1;
    var pictTopMargin = spec.pictTopMargin || 0;
    var pictLeftMargin = spec.pictLeftMargin || 64;
    var pictCutSize = spec.pictMarginSize || 128;
    var visible = true;
    var pilotButton = {};
    var miniPilot = {};

    var GRID_WINDOW_SIZE = 16;

    (function(){
        that.x = spec.x || 0;
        that.y = spec.y || 0;
        pilotButton = gridWindow({
            pict : windowPict,
            width : width,
            height : height
        });
        that.addChild(pilotButton);

        miniPilot = new Sprite(width * GRID_WINDOW_SIZE,height * GRID_WINDOW_SIZE);
        miniPilot.image = createFaceIcon(pilotPict);
        miniPilot.scaleX = scaleX;
        that.addChild(miniPilot);
    })()

    that.getVisible = function(){
        return visible;
    }

    that.setVisible = function(value){
        visible = value;
        pilotButton.setVisible(value);
        miniPilot.visible = value;
    }

    function createFaceIcon(image) {
        var iconMargin = 6;
        var posx1 = iconMargin;
        var posy1 = iconMargin;
        var posx2 = width * GRID_WINDOW_SIZE - iconMargin*2;
        var posy2 = height * GRID_WINDOW_SIZE - iconMargin*2;

        var faceIcon = new Surface(width * GRID_WINDOW_SIZE, height * GRID_WINDOW_SIZE);
        faceIcon.draw(image,pictLeftMargin,pictTopMargin,pictCutSize,pictCutSize,posx1,posy1,posx2,posy2);
        return faceIcon;
    }

    return that;
}