function selectPilotScene(spec,my) {
    var that = new Scene();
    var core = enchant.Core.instance;

    that.background = {};
    that.tile = {};

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
    }

    return that;
}