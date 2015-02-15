function pilotIcon(spec,my){
    var that = new Group();
    var core = enchant.Core.instance;
    var windowPict = spec.windowPict;
    var pilotPict = spec.pilotPict;
    var width = spec.width || 5;
    var height = spec.height || 5;
    var scaleX = spec.scaleX;
    var visible = true;
    var pilotButton = {};
    var miniPilot = {};


    init();
    function init(){
        pilotButton = gridWindow({
            pict : windowPict,
            width : width,
            height : height
        });
        that.addChild(pilotButton);

        miniPilot = new Sprite(80,80);
        miniPilot.image = createFaceIcon(pilotPict);
        miniPilot.scaleX = scaleX;
        that.addChild(miniPilot);
    }

    that.getVisible = function(){
        return visible;
    }

    that.setVisible = function(value){
        visible = value;
        pilotButton.setVisible(value);
        miniPilot.visible = value;
    }

    function createFaceIcon(image) {
        var widthMargin = 64;
        var topMargin = 0;
        var size = 128;
        var iconMargin = 6;
        var posx1 = iconMargin;
        var posx2 = width*16 - iconMargin*2;
        var posy1 = iconMargin;
        var posy2 = height*16 - iconMargin*2;

        var faceIcon = new Surface(80,80);
        //faceIcon.draw(image,widthMargin,topMargin,size,size,6,6,68,68);
        faceIcon.draw(image,widthMargin,topMargin,size,size,posx1,posy1,posy2,posy2);
        return faceIcon;
    }

    return that;
}