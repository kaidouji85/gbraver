var gridWindow = require('../window/gridWindow');

module.exports = function(spec,my){
    var that = new Group();
    var core = enchant.Core.instance;
    var windowPict = spec.windowPict;
    var armdozerPict = spec.armdozerPict;
    var visible = true;
    var armdozerButton = {};
    var miniArmdozer = {};
    var pushedButton = {};

    init();
    function init(){
        armdozerButton = gridWindow({
            pict : windowPict,
            width : 4,
            height : 4
        });
        that.addChild(armdozerButton);


        miniArmdozer = new Sprite(80,80);
        miniArmdozer.image = createFaceIcon(armdozerPict);
        that.addChild(miniArmdozer);

        pushedButton = gridWindow({
            pict : windowPict,
            width : 4,
            height : 4
        });
        pushedButton.setOpacity(0);
        that.addChild(pushedButton);
    }

    that.getVisible = function(){
        return visible;
    }

    that.setVisible = function(value){
        visible = value;
        armdozerButton.setVisible(value);
        miniArmdozer.visible = value;
        pushedButton.setVisible(value);
    }

    function createFaceIcon(image) {
        var widthMargin = 48;
        var size = 64;
        var faceIcon = new Surface(80,80);
        faceIcon.draw(image,widthMargin,0,size,size,6,6, 52,52);
        return faceIcon;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        core.assets[core.SOUND_PUSH_BUTTON].play();
        pushedButton.setOpacity(0.6);
    });

    that.addEventListener(Event.TOUCH_END,function(){
        pushedButton.setOpacity(0);
    });

    return that;
}