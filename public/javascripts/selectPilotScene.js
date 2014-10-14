function selectPilotScene(spec,my) {
    var MAX_PILOT = 3;

    var that = new Scene();
    var core = enchant.Core.instance;
    var pilotList = spec.pilotList;
    var emitPushButton = function(){};

    that.background = {};
    that.tile = {};
    that.prevButton = {};
    that.pilotButtonArray = new Array(MAX_PILOT);

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'パイロット選択'
        });
        that.addChild(that.title);


        for(var pid=0; pid<MAX_PILOT; pid++) {
            //パイロットボタン
            that.pilotButtonArray[pid] = pictButton({
                text : pilotList[pid].name,
                pict : core.assets[core.PICT_WINDOW],
                subPict : core.assets[core.PICT_ACTIVE_WINDOW]
            });
            //TODO : ボタン位置は後で調整する
            that.pilotButtonArray[pid].x = 12;
            that.pilotButtonArray[pid].y = 200 + 60*pid;
            that.addChild(that.pilotButtonArray[pid]);
        }

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.prevButton.addEventListener(Event.TOUCH_END,function(){
            emitPushButton();
        });
        that.prevButton.x = 12;
        that.prevButton.y = 420;
        that.addChild(that.prevButton);
    }

    that.onPushPrevButton = function(fn){
        emitPushButton = fn;
    }

    return that;
}