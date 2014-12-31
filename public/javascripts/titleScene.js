function titleScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var emitPushStartButton = function(){};
    that.backgroundColor = "black";

    init();
    function init() {
        that.startButton = pictButton({
            text : 'スタート',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.startButton.x = 88;
        that.startButton.y = 300;
        that.startButton.addEventListener(Event.TOUCH_END,pushStartButton);
        that.addChild(that.startButton);
    }

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setBgm(core.assets[core.SOUND_TITLE]);
    });

    that.onPushStartButton = function(fn){
        emitPushStartButton = fn;
    }

    function pushStartButton() {
        that.startButton.setVisible(false);
        emitPushStartButton();
    }

    return that;
}