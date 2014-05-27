function setArmdozerScene(){
    var that = new Scene();
    that.backgroundColor = "black";
    that.armdozerButtonArray = new Array(MAX_ARMDOZER_BUTTON);
    
    var core = enchant.Core.instance;
    var MAX_ARMDOZER_BUTTON = 2;
    var armdozerIdList = [
        {name:'グランブレイバー',id:'granBraver'},
        {name:'ランドーザ',id:'landozer'}
    ];
    var prevButton;
    var labelArmmdozerSelect;
    var emitSelectArmdozer;
    var emitPushPrevButton;
    
    initSprite();
    function initSprite(){
        //キャラクター選択ボタン
        for(var i=0; i<MAX_ARMDOZER_BUTTON; i++){
            that.armdozerButtonArray[i] = new Button(armdozerIdList[i].name,'blue',40,200);
        }
        that.armdozerButtonArray.forEach(function(button,i){
            button.x = 50;
            button.y = 60+60*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushArmdozerButton(i);
            }); 
            that.addChild(button);
        });
        
        //戻るボタン
        prevButton = new Button('戻る','blue',40,200);
        prevButton.x = 50;
        prevButton.y = 250;
        prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(prevButton);
        
        //アームドーザ選択ラベル
        labelArmmdozerSelect = new Label('アームドーザ選択');
        labelArmmdozerSelect.color = 'white';
        labelArmmdozerSelect.x = 100;
        labelArmmdozerSelect.y = 30;
        that.addChild(labelArmmdozerSelect);
    }
    
    that.onSelectArmdozer = function(fn){
        emitSelectArmdozer = fn;
    };
    
    that.onPushPrevButton = function(fn){
        emitPushPrevButton = fn;
    };
    
    that.pushArmdozerButton = pushArmdozerButton;
    function pushArmdozerButton(i){
        var data = {
            armdozerId : armdozerIdList[i].id
        };
        emitSelectArmdozer(data);
    }
    
    function pushPrevButton(){
        emitPushPrevButton();
    }
    
    return that;
}
