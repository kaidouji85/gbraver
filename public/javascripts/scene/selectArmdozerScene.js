function selectArmdozerScene(spec,my){
    var MAX_ARMDOZER = 3;

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
            that.armdozerButtonArray[i] = armdozerIcon({
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
            height : 5,
            spriteWidth : 32,
            spriteHeight : 32
        });
        that.infoWindow.x = 150;
        that.infoWindow.y = 100;
        that.addChild(that.infoWindow);

        //アームドーザ名ラベル
        that.armdozerNameLabel = new Label('');
        that.armdozerNameLabel.color = "white";
        that.armdozerNameLabel.x = 170;
        that.armdozerNameLabel.y = 120;
        that.addChild(that.armdozerNameLabel);

        //HPラベル
        that.hpLabel = new Label('HP');
        that.hpLabel.color = "white";
        that.hpLabel.x = 170;
        that.hpLabel.y = 150;
        that.addChild(that.hpLabel);

        //HPバリューラベル
        that.hpValueLabel = new Label('');
        that.hpValueLabel.color = "white";
        that.hpValueLabel.x = 230;
        that.hpValueLabel.y = 150;
        that.addChild(that.hpValueLabel);

        //攻撃力ラベル
        that.powerLabel = new Label('攻撃');
        that.powerLabel.color = 'white';
        that.powerLabel.x = 170;
        that.powerLabel.y = 170;
        that.addChild(that.powerLabel);

        //攻撃力バリューラベル
        that.powerValueLabel = new Label('');
        that.powerValueLabel.color = 'white';
        that.powerValueLabel.x = 230;
        that.powerValueLabel.y = 170;
        that.addChild(that.powerValueLabel);

        //装甲ラベル
        that.defenseLabel = new Label('脆性');
        that.defenseLabel.color = 'white';
        that.defenseLabel.x = 170;
        that.defenseLabel.y = 190;
        that.addChild(that.defenseLabel);

        //装甲バリューラベル
        that.defenseValueLabel = new Label('');
        that.defenseValueLabel.color = 'white';
        that.defenseValueLabel.x = 230;
        that.defenseValueLabel.y = 190;
        that.addChild(that.defenseValueLabel);

        //機動力ラベル
        that.speedLabel = new Label('機動');
        that.speedLabel.color = "white";
        that.speedLabel.x = 170;
        that.speedLabel.y = 210;
        that.addChild(that.speedLabel);

        //機動力バリューラベル
        that.speedValueLabel = new Label('');
        that.speedValueLabel.color = "white";
        that.speedValueLabel.x = 230;
        that.speedValueLabel.y = 210;
        that.addChild(that.speedValueLabel);

        //選択したアームドーザ
        that.selectArmdozerSprite = new Sprite(160,160);
        that.selectArmdozerSprite.y = 110;
        that.addChild(that.selectArmdozerSprite);

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