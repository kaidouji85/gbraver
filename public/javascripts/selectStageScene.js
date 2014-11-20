function selectStageScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var stageData = spec.stageData;
    var armdozerList = spec.armdozerList;
    var emitPushStageButton = function(enemyId,routineId){};

    that.stageButtonArray = [];
    init();
    function init(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'ステージ選択'
        });
        that.addChild(that.title);

        //ステージボタン
        for(var i=0; i<stageData.length; i++){
            that.stageButtonArray[i] = createStageButton(stageData[i]);
            that.stageButtonArray[i].x = 8;
            that.stageButtonArray[i].y = 64 + i*64;
            that.addChild(that.stageButtonArray[i]);
        }
    }

    that.onPushStageButon = function (fn){
        emitPushStageButton = fn;
    }

    function createStageButton(stage){
        var stageButton = pictButton({
            text : stage.title,
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        stageButton.addEventListener(Event.TOUCH_END,function(){
            emitPushStageButton(stage.enemyId,stage.routineId);
        })
        return stageButton;

    }

    return that;
}