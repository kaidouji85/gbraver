function pilotIcon(spec,my){
    var that = new Group();
    var windowPict = spec.windowPict;
    var pilotPict = spec.pilotPict;
    var visible = true;
    var pilotButton = {};
    var miniPilot = {};


    init();
    function init(){
        pilotButton = gridWindow({
            pict : windowPict,
            width : 5,
            height : 5
        });
        that.addChild(pilotButton);

        miniPilot = new Sprite(80,80);
        miniPilot.image = createFaceIcon(pilotPict);
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
        var size = 128;
        var faceIcon = new Surface(80,80);
        faceIcon.draw(image,widthMargin,0,size,size,6,6,68,68);
        return faceIcon;
    }

    return that;
}