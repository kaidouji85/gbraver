function selectPilotScene(spec,my) {
    var MAX_PILOT = 4;
    var STATUS_WINDOW_X = 176;
    var STATUS_WINDOW_Y = 80;
    var PILOT_SKILL_WINDOW_X = 16;
    var PILOT_SKILL_WINDOW_Y = 224;

    var that = new Scene();
    var core = enchant.Core.instance;
    var pilotList = spec.pilotList;
    var selectPilotId = spec.selectPilotId;
    var emitPushButton = function(){};
    var emitPushOkButton = function(pilotId,pilotPict){};

    that.backgroundColor = "black";
    that.pilotButtonArray = new Array(MAX_PILOT);

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //選択中のパイロット画像
        that.selectPilotSprite = new Sprite(256,256);
        that.selectPilotSprite.x = -48;
        that.selectPilotSprite.y = 32;
        that.selectPilotSprite.scaleX = 0.8;
        that.selectPilotSprite.scaleY = 0.8;
        that.addChild(that.selectPilotSprite);

        //パイロット情報ウインドウ
        that.infoWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 4,
            height : 4,
            spriteWidth : 32,
            spriteHeight : 32
        });
        that.infoWindow.x = STATUS_WINDOW_X;
        that.infoWindow.y = STATUS_WINDOW_Y;
        that.addChild(that.infoWindow);

        //パイロット名ラベル
        that.pilotLabel = new Label();
        that.pilotLabel.color = "white";
        that.pilotLabel.x = STATUS_WINDOW_X + 16;
        that.pilotLabel.y = STATUS_WINDOW_Y + 16;
        that.addChild(that.pilotLabel);

        //HPラベル
        that.hpLabel = new Label('HP');
        that.hpLabel.color = "white";
        that.hpLabel.x = STATUS_WINDOW_X + 16;
        that.hpLabel.y = STATUS_WINDOW_Y + 48;
        that.addChild(that.hpLabel);

        //HPバリューラベル
        that.hpValueLabel = new Label();
        that.hpValueLabel.text = "100";
        that.hpValueLabel.color = "white";
        that.hpValueLabel.y = STATUS_WINDOW_Y + 48;
        that.addChild(that.hpValueLabel);

        //攻撃ラベル
        that.attackLabel = new Label('攻撃');
        that.attackLabel.color = 'white';
        that.attackLabel.x = STATUS_WINDOW_X + 16;
        that.attackLabel.y = STATUS_WINDOW_Y + 64;
        that.addChild(that.attackLabel);

        //攻撃バリューラベル
        that.attackValueLabel = new Label();
        that.attackValueLabel.color = 'white';
        that.attackValueLabel.y = STATUS_WINDOW_Y + 64;
        that.addChild(that.attackValueLabel);

        //防御ラベル
        that.defenseLabel = new Label('防御');
        that.defenseLabel.color = 'white';
        that.defenseLabel.x = STATUS_WINDOW_X + 16;
        that.defenseLabel.y = STATUS_WINDOW_Y + 80;
        that.addChild(that.defenseLabel);

        //防御バリューラベル
        that.defenseValueLabel = new Label();
        that.defenseValueLabel.color = 'white';
        that.defenseValueLabel.y = STATUS_WINDOW_Y + 80;
        that.addChild(that.defenseValueLabel);

        //機動ラベル
        that.speedLabel = new Label('機動');
        that.speedLabel.color = 'white';
        that.speedLabel.x = STATUS_WINDOW_X + 16;
        that.speedLabel.y = STATUS_WINDOW_Y + 96;
        that.addChild(that.speedLabel);

        //機動バリューラベル
        that.speedValueLabel = new Label();
        that.speedValueLabel.color = 'white';
        that.speedValueLabel.y = STATUS_WINDOW_Y + 96;
        that.addChild(that.speedValueLabel);

        //スキルウインドウ
        that.skillWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 9,
            height : 2,
            spriteWidth : 32,
            spriteHeight : 32
        });
        that.skillWindow.x = PILOT_SKILL_WINDOW_X;
        that.skillWindow.y = PILOT_SKILL_WINDOW_Y;
        that.addChild(that.skillWindow);

        //スキルラベル
        that.skillLabel = new Label('パイロットスキル');
        that.skillLabel.color = "white";
        that.skillLabel.x = PILOT_SKILL_WINDOW_X + 16;
        that.skillLabel.y = PILOT_SKILL_WINDOW_Y + 16;
        that.addChild(that.skillLabel);

        //スキルバリューラベル
        that.skillValueLabel = new Label();
        that.skillValueLabel.color = "white";
        that.skillValueLabel.x = PILOT_SKILL_WINDOW_X + 16;
        that.skillValueLabel.y = PILOT_SKILL_WINDOW_Y + 36;
        that.addChild(that.skillValueLabel);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_BLACK_WINDOW],
            text : 'パイロット選択'
        });
        that.addChild(that.title);

        //パイロットボタン
        for(var i=0; i<MAX_PILOT; i++) {
            that.pilotButtonArray[i] = pilotButton({
                windowPict : core.assets[core.PICT_BLACK_WINDOW],
                pilotPict : core.assets[core.PICT_PREFIX + pilotList[i].pict],
                pictTopMargin : pilotList[i].pictTopMargin,
                pictLeftMargin : pilotList[i].pictLeftMargin,
                width : 4,
                height : 4
            });
        }

        that.pilotButtonArray.forEach(function(button,i){
            button.x = 10 + 80*i;
            button.y = 320;
            button.addEventListener(Event.TOUCH_END,function(){
                var pilotId = pilotList[i].id;
                selectPilotId = pilotId;
                pushPilotButton(pilotId);
            });
            that.addChild( button);
        });

        pilotList.forEach(function(){
            emitPushOkButton();
        });

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.prevButton.addEventListener(Event.TOUCH_END,function(){
            emitPushButton();
        });
        that.prevButton.x = 168;
        that.prevButton.y = 420;
        that.addChild(that.prevButton);

        //決定ボタン
        that.okButton = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.okButton.addEventListener(Event.TOUCH_END,function(){
            invisibleButton();
            that.mesWindow.setVisible(true);
            emitPushOkButton(selectPilotId);
        });
        that.okButton.x = 8;
        that.okButton.y = 420;
        that.addChild(that.okButton);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.addChild(that.mesWindow);

        refreshInformation(selectPilotId);
    }

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setMute();
    });
    
    that.getName = function(){
        return 'selectPilot';
    }

    that.onPushPrevButton = function(fn){
        emitPushButton = fn;
    }

    that.onPushOkButton = function(fn){
        emitPushOkButton = fn;
    }

    function pushPilotButton(pilotId) {
        refreshInformation(pilotId);
    }

    function invisibleButton(){
        that.okButton.setVisible(false);
        that.prevButton.setVisible(false);
        for(var i in that.pilotButtonArray){
            that.pilotButtonArray[i].setVisible(false);
        }
    }

    function refreshInformation(pilotId){
        var pilotData = getPilotData(pilotId);
        that.pilotLabel.text = pilotData.name;
        that.skillValueLabel.text = getSkillDescription(pilotData);
        that.hpValueLabel.text = pilotData.hp;
        that.attackValueLabel.text = pilotData.power;
        that.defenseValueLabel.text = pilotData.defense;
        that.speedValueLabel.text = pilotData.speed;
        that.selectPilotSprite.image = core.assets[core.PICT_PREFIX+pilotData.pict];

        that.hpValueLabel.x = STATUS_WINDOW_X + 104 - that.hpValueLabel._boundWidth;
        that.attackValueLabel.x = STATUS_WINDOW_X + 104 - that.attackValueLabel._boundWidth;
        that.defenseValueLabel.x = STATUS_WINDOW_X + 104 - that.defenseValueLabel._boundWidth;
        that.speedValueLabel.x = STATUS_WINDOW_X + 104 - that.speedValueLabel._boundWidth;
    }

    function getPilotData(pilotId){
        for(var i=0; i<pilotList.length; i++){
            if(pilotList[i].id === pilotId){
                return pilotList[i];
            }
        }
    }

    return that;
}