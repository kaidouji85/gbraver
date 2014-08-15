function setArmdozerScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var MAX_ARMDOZER_BUTTON = 4;
    var armdozerIdList = spec.armdozerIdList;
    var labelArmmdozerSelect;
    var labelWait;
    var emitSelectArmdozer = function(data){};
    var emitPushPrevButton = function(){};

    that.backgroundColor = 'black';
    that.background = {};
    that.armdozerButtonArray = new Array(MAX_ARMDOZER_BUTTON);
    that.prevButton = {};
    that.onSelectArmdozer  = onSelectArmdozer;
    that.onPushPrevButton = onPushPrevButton;

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_SYSTEM_BACKGROUND];
        that.addChild(that.background);

        //キャラクター選択ボタン
        for(var i=0; i<MAX_ARMDOZER_BUTTON && i<armdozerIdList.length; i++){
            that.armdozerButtonArray[i] = pictButton({
                text : armdozerIdList[i].name,
                pict : core.assets[core.PICT_BULUE_BUTTON]
            });
        }
        that.armdozerButtonArray.forEach(function(button,i){
            button.x = 96;
            button.y = 200+40*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushArmdozerButton(i);
            });
            that.addChild(button);
        });
        
        //戻るボタン
        //that.prevButton = new Button('戻る','blue',core.BUTTON_HEIGHT,core.BUTTON_WIDTH);
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.prevButton.x = 96;
        that.prevButton.y = 380;
        that.prevButton.visible = true;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(that.prevButton);
        
        //アームドーザ選択ラベル
        labelArmmdozerSelect = new Label('アームドーザ選択');
        labelArmmdozerSelect.color = 'white';
        labelArmmdozerSelect.x = 100;
        labelArmmdozerSelect.y = 30;
        that.addChild(labelArmmdozerSelect);

        //待機中ラベル
        labelWait = new Label('待機中');
        labelWait.color = "white";
        labelWait.x = 10;
        labelWait.y = 10;
        labelWait.visible = false;
        that.addChild(labelWait);
    }
    
    function onSelectArmdozer(fn){
        emitSelectArmdozer = fn;
    };
    
    function onPushPrevButton(fn){
        emitPushPrevButton = fn;
    };
    
    function pushArmdozerButton(i){
        setWaitScene();
        var data = {
            armdozerId : armdozerIdList[i].id
        };
        emitSelectArmdozer(data);
    }
    
    function pushPrevButton(){
        emitPushPrevButton();
    }

    function setWaitScene(){
        for(var i=0; i<MAX_ARMDOZER_BUTTON && i<armdozerIdList.length; i++){
            that.armdozerButtonArray[i].setVisible(false);
        }
        that.prevButton.setVisible(false);
        labelWait.visible = true;
        labelArmmdozerSelect.visible = false;
    }

    return that;
}
