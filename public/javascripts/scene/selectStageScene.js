function selectStageScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var stageData = spec.stageData;
    var armdozerList = spec.armdozerList;
    var emitPushStageButton = function(enemyId,routineId){};
    var emitPushPrevButton = function(){};

    that.stageButtonArray = [];
    init();
    function init(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_BLACK_WINDOW],
            text : 'ステージ選択'
        });
        that.addChild(that.title);

        //ステージボタン
        for(var i=0; i<stageData.length; i++){
            that.stageButtonArray[i] = createStageButton(i+1,stageData[i]);
            that.stageButtonArray[i].x = 16;
            that.stageButtonArray[i].y = 64 + i*76;
            that.addChild(that.stageButtonArray[i]);
        }

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.prevButton.x = 88;
        that.prevButton.y = 426;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushPrevButton();
        });
        that.addChild(that.prevButton);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = 180;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.addChild(that.mesWindow);
    }

    that.getName = function(){
        return 'selectStage';
    }

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setBgm(core.assets[core.SOUND_CONFIG]);
    });

    that.onPushStageButon = function (fn){
        emitPushStageButton = fn;
    }

    that.onPushPrevButton = function(fn){
        emitPushPrevButton = fn;
    }

    function createStageButton(stageNo,stageData){
        var button = stageButton({
            stageNo : stageNo,
            stageTitle : stageData.title,
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        button.addEventListener(Event.TOUCH_END,function(){
            for(var i=0; i<that.stageButtonArray.length; i++){
                that.stageButtonArray[i].setVisible(false);
            }
            that.prevButton.setVisible(false);
            that.mesWindow.setVisible(true);
            emitPushStageButton(stageData.enemyId,stageData.pilotId,stageData.routineId);
        })
        return button;
    }

    return that;
}