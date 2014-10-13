function selectPilotScene(spec,my) {
    var MAX_PILOT = 3;

    var that = new Scene();
    var core = enchant.Core.instance;
    var pilotList = spec.pilotList;

    that.background = {};
    that.tile = {};
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
            that.pilotButtonArray[pid].y = 200 + 80*pid;
            that.addChild(that.pilotButtonArray[pid]);
        }
    }

    return that;
}