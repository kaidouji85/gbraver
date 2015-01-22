function pilotButton(spec,my){
    var that = pilotIcon(spec,my);
    var core = enchant.Core.instance;
    var pushedButton = {};

    (function(){
        pushedButton = gridWindow({
            pict : spec.windowPict,
            width : 5,
            height : 5
        });
        pushedButton.setOpacity(0);
        that.addChild(pushedButton);
    })()

    that.addEventListener(Event.TOUCH_START,function(){
        core.assets[core.SOUND_PUSH_BUTTON].play();
        pushedButton.setOpacity(0.6);
    });

    that.addEventListener(Event.TOUCH_END,function(){
        pushedButton.setOpacity(0);
    });

    return that;
}