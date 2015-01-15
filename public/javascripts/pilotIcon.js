function pilotIcon(spec,my){
    var that = new Group();
    var core = enchant.Core.instance;
    var windowPict = spec.windowPict;
    var pilotPict = spec.pilotPict;
    var scaleX = spec.scaleX;
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
        var size = 128;
        var faceIcon = new Surface(80,80);
        faceIcon.draw(image,widthMargin,0,size,size,6,6,68,68);
        return faceIcon;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        core.assets[core.SOUND_PUSH_BUTTON].play();
    });

    return that;
}