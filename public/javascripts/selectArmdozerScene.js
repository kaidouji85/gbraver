function selectArmdozerScene(spec,my){
    var MAX_ARMDOZER = 3;

    var that = new Scene();
    var core = enchant.Core.instance;
    var armdozerList = spec.armdozerList;
    var selectArmdozerId = spec.selectArmdozerId;
    var emitPushOkButton = function(){};
    that.background = {};
    that.tile = {};
    that.selectArmdozerSprite = {};
    that.armdozerButtonArray = new Array(MAX_ARMDOZER);

    init();
    function init(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'アームドーザ選択'
        });
        that.addChild(that.title);

        //アームドーザボタン
        for(var aid=0; aid<MAX_ARMDOZER; aid++) {
            that.armdozerButtonArray[aid] = armdozerIcon({
                windowPict : core.assets[core.PICT_WINDOW],
                armdozerPict : core.assets[core.PICT_PREFIX + armdozerList[aid].pictName]
            });
        }
        that.armdozerButtonArray.forEach(function(button,aid){
            button.x = 20 + 100*aid;
            button.y = 320;
            button.addEventListener(Event.TOUCH_END,function(){
                var armdozerId = armdozerList[aid].armdozerId;
                emitPushOkButton(armdozerId);
            });
            that.addChild(button);
        });

        //選択したアームドーザ
        that.selectArmdozerSprite = new Sprite(160,160);
        that.selectArmdozerSprite.image = core.assets[core.PICT_PREFIX+getArmdozerData(selectArmdozerId).pictName];
        that.selectArmdozerSprite.y = 110;
        that.addChild(that.selectArmdozerSprite);
    }

    that.onPushOkButton = function(fn){
        emitPushOkButton = fn;
    };

    function getArmdozerData(armdozerId){
        for(var aid in armdozerList){
            armdozerList[aid].armdozerId == armdozerId;
            return armdozerList[aid];
        }
    }

    return that;
}