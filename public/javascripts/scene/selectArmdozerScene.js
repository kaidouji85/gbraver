function selectArmdozerScene(spec,my){
    var MAX_ARMDOZER = 3;
    var INFO_WINDOW_X = 144;
    var INFO_WINDOW_Y = 64;

    var that = new Scene();
    var core = enchant.Core.instance;
    var armdozerList = spec.armdozerList;
    var selectArmdozerId = spec.selectArmdozerId;
    var emitPushOkButton = function(armdozerId){};
    var emitPushPrevButton = function(){}

    that.backgroundColor = "black";
    that.background = {};
    that.tile = {};
    that.infoWindow = {};
    that.selectArmdozerSprite = {};
    that.armdozerButtonArray = new Array(MAX_ARMDOZER);

    init();
    function init(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_BLACK_WINDOW],
            text : 'アームドーザ選択'
        });
        that.addChild(that.title);

        //アームドーザボタン
        for(var i=0; i<MAX_ARMDOZER; i++) {
            that.armdozerButtonArray[i] = armdozerButton({
                windowPict : core.assets[core.PICT_BLACK_WINDOW],
                armdozerPict : core.assets[core.PICT_PREFIX + armdozerList[i].pictName]
            });
        }
        that.armdozerButtonArray.forEach(function(button,i){
            button.x = 20 + 100*i;
            button.y = 320;
            button.addEventListener(Event.TOUCH_END,function(){
                var armdozerId = armdozerList[i].armdozerId;
                selectArmdozerId = armdozerId;
                refreshInformation(armdozerId);
            });
            that.addChild(button);
        });

        //アームドーザ情報ウインドウ
        that.infoWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 5,
            height : 4,
            spriteWidth : 32,
            spriteHeight : 32
        });
        that.infoWindow.x = INFO_WINDOW_X;
        that.infoWindow.y = INFO_WINDOW_Y;
        that.addChild(that.infoWindow);

        //アームドーザ名ラベル
        that.armdozerNameLabel = new Label('');
        that.armdozerNameLabel.color = "white";
        that.armdozerNameLabel.x = INFO_WINDOW_X + 16;
        that.armdozerNameLabel.y = INFO_WINDOW_Y + 24;
        that.addChild(that.armdozerNameLabel);

        //HPラベル
        that.hpLabel = new Label('HP');
        that.hpLabel.color = "white";
        that.hpLabel.x = INFO_WINDOW_X + 32;
        that.hpLabel.y = INFO_WINDOW_Y + 48;
        that.addChild(that.hpLabel);

        //HPバリューラベル
        that.hpValueLabel = new Label('');
        that.hpValueLabel.color = "white";
        that.hpValueLabel.y = INFO_WINDOW_Y + 48;
        that.addChild(that.hpValueLabel);

        //攻撃力ラベル
        that.powerLabel = new Label('攻撃');
        that.powerLabel.color = 'white';
        that.powerLabel.x = INFO_WINDOW_X + 32;
        that.powerLabel.y = INFO_WINDOW_Y + 64;
        that.addChild(that.powerLabel);

        //攻撃力バリューラベル
        that.powerValueLabel = new Label('');
        that.powerValueLabel.color = 'white';
        that.powerValueLabel.y = INFO_WINDOW_Y + 64;
        that.addChild(that.powerValueLabel);

        //装甲ラベル
        that.defenseLabel = new Label('防御');
        that.defenseLabel.color = 'white';
        that.defenseLabel.x = INFO_WINDOW_X + 32;
        that.defenseLabel.y = INFO_WINDOW_Y + 80;
        that.addChild(that.defenseLabel);

        //装甲バリューラベル
        that.defenseValueLabel = new Label('');
        that.defenseValueLabel.color = 'white';
        that.defenseValueLabel.y = INFO_WINDOW_Y + 80;
        that.addChild(that.defenseValueLabel);

        //機動力ラベル
        that.speedLabel = new Label('機動');
        that.speedLabel.color = "white";
        that.speedLabel.x = INFO_WINDOW_X + 32;
        that.speedLabel.y = INFO_WINDOW_Y + 96;
        that.addChild(that.speedLabel);

        //機動力バリューラベル
        that.speedValueLabel = new Label('');
        that.speedValueLabel.color = "white";
        that.speedValueLabel.y = INFO_WINDOW_Y + 96;
        that.addChild(that.speedValueLabel);

        //選択したアームドーザ
        that.selectArmdozerSprite = new Sprite(160,160);
        that.selectArmdozerSprite.y = 48;
        that.addChild(that.selectArmdozerSprite);

        //アビリティウインドウ
        that.abilityWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 9,
            height : 2,
            spriteWidth : 32,
            spriteHeight : 32
        });
        that.abilityWindow.x = 16;
        that.abilityWindow.y = 212;
        that.addChild(that.abilityWindow);

        //アビリティラベル
        that.abilityLabel = new Label('アームドーザアビリティ');
        that.abilityLabel.color = "white";
        that.abilityLabel.x = 32;
        that.abilityLabel.y = 226;
        that.addChild(that.abilityLabel);

        //アビリティ発動条件ラベル
        that.abilityTriggerLabel = new Label('発動条件');
        that.abilityTriggerLabel.color = "white";
        that.abilityTriggerLabel.x = 32;
        that.abilityTriggerLabel.y = 242;
        that.addChild(that.abilityTriggerLabel);

        //アビリティ説明ラベル
        that.abilityDescriptionLabel = new Label('アビリティ説明');
        that.abilityDescriptionLabel.color = 'white';
        that.abilityDescriptionLabel.x = 32;
        that.abilityDescriptionLabel.y = 258;
        that.addChild(that.abilityDescriptionLabel);

        //決定ボタン
        that.okButton = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.okButton.addEventListener(Event.TOUCH_END,selectArmdozer);
        that.okButton.x = 8;
        that.okButton.y = 420;
        that.addChild(that.okButton);

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.prevButton.addEventListener(Event.TOUCH_END,function(){
            emitPushPrevButton();
        });
        that.prevButton.x = 168;
        that.prevButton.y = 420;
        that.addChild(that.prevButton);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.addChild(that.mesWindow);

        refreshInformation(selectArmdozerId);
    }

    that.getName = function(){
        return 'selectArmdozer';
    }

    that.onPushOkButton = function(fn){
        emitPushOkButton = fn;
    };

    that.onPushPrevButton = function(fn){
        emitPushPrevButton = fn;
    }

    function getArmdozerData(armdozerId){
        for(var i=0; i<armdozerList.length; i++){
            if(armdozerList[i].armdozerId === armdozerId){
                return armdozerList[i];
            }
        }
    }

    function refreshInformation(armdozerId){
        var armdozerData = getArmdozerData(armdozerId);
        that.selectArmdozerSprite.image = core.assets[core.PICT_PREFIX+armdozerData.pictName];
        that.armdozerNameLabel.text = armdozerData.name;
        that.hpValueLabel.text = armdozerData.hp;
        that.defenseValueLabel.text = armdozerData.defense;
        that.powerValueLabel.text = armdozerData.weapons[1].power;
        that.speedValueLabel.text = armdozerData.speed;
        that.abilityTriggerLabel.text = '条件：' + getArmdozerAbilityTrigger( armdozerData.ability );
        that.abilityDescriptionLabel.text = '効果：' + getArmdozerAbilityDescription( armdozerData.ability );

        that.hpValueLabel.x = 272 - that.hpValueLabel._boundWidth;
        that.powerValueLabel.x = 272 - that.powerValueLabel._boundWidth;
        that.defenseValueLabel.x = 272 - that.defenseValueLabel._boundWidth;
        that.speedValueLabel.x = 272 - that.speedValueLabel._boundWidth;
    }

    function selectArmdozer(){
        that.mesWindow.setVisible(true);
        that.prevButton.setVisible(false);
        that.okButton.setVisible(false);
        for(var i in that.armdozerButtonArray){
            that.armdozerButtonArray[i].setVisible(false);
        }
        emitPushOkButton(selectArmdozerId);
    }

    return that;
}