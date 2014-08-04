function battleSceneBase(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;

    that.statusArray = $.extend(true, {}, spec.statusArray);
    that.userId = spec.userId;
    that.backgroundColor = "black";
    that.atackIcon = {};
    that.chargeIcon = {};
    that.plusIcon = {};
    that.minusIcon = {};
    that.okIcon = {};
    that.prevIcon = {};
    that.charaSpriteArray = {};
    that.hpMertorArray = {};
    that.activeBarArray = {};
    that.batteryMertorArray = {};
    that.batteryNumberArray = {};
    that.damageLabelArray = {};
    that.subDamageLabelArray = {};
    that.hitEffect = {};

    that.refreshMertor = function(statusArray){
        for(var uid in statusArray){
            that.hpMertorArray[uid].setValue(statusArray[uid].hp);
            that.batteryMertorArray[uid].setValue(statusArray[uid].battery);
            that.activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    initSprite();
    function initSprite() {
        for(var uid in that.statusArray){
            //キャラクタースプライト
            var spec = {
                pict : core.assets[core.PICT_PREFIX+that.statusArray[uid].pictName],
                direction : uid===that.userId ? 'right' : 'left'
            };
            that.charaSpriteArray[uid] = new ArmdozerSprite(spec);
            that.addChild(that.charaSpriteArray[uid]);

            //HPメータ
            that.hpMertorArray[uid] = hpMertor();
            that.hpMertorArray[uid].y = 4;
            that.hpMertorArray[uid].x = uid===that.userId ? 190 : 10;
            that.hpMertorArray[uid].setValue(that.statusArray[uid].hp);
            that.addChild(that.hpMertorArray[uid]);

            //アクティブゲージ
            that.activeBarArray[uid] = customBar({
                barImage : core.assets[core.PICT_ACTIVE_BAR],
                backImage : core.assets[core.PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.activeBarArray[uid].x = uid===that.userId ? 190 : 130;
            that.activeBarArray[uid].y = 22;
            that.addChild(that.activeBarArray[uid]);

            //バッテリーメータ
            that.batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[core.PICT_BATTERY_GAUGE],
                backImage : core.assets[core.PICT_BATTERY_BACK],
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.batteryMertorArray[uid].x = uid===that.userId ? 190 : 10;
            that.batteryMertorArray[uid].y = 43;
            that.batteryMertorArray[uid].setValue(5);
            that.addChild(that.batteryMertorArray[uid]);

            //出したバッテリー
            that.batteryNumberArray[uid] = new Sprite(64,64);
            that.batteryNumberArray[uid].image = core.assets[core.PICT_BATTERY_NUMBER];
            that.batteryNumberArray[uid].x = uid===that.userId ? 226 : 30;
            that.batteryNumberArray[uid].y = 110;
            that.batteryNumberArray[uid].visible = false;
            that.addChild(that.batteryNumberArray[uid]);

            //ダメージラベル
            that.damageLabelArray[uid] = new MutableText(0,0);
            that.damageLabelArray[uid].x = uid===that.userId ? 180 : 20;
            that.damageLabelArray[uid].y = 240;
            that.damageLabelArray[uid].visible = false;
            that.addChild(that.damageLabelArray[uid]);

            //サブダメーララベル
            that.subDamageLabelArray[uid] = new MutableText(0,0);
            that.subDamageLabelArray[uid].x = uid===that.userId ? 180 : 20;
            that.subDamageLabelArray[uid].y = 210;
            that.subDamageLabelArray[uid].visible = false;
            that.addChild(that.subDamageLabelArray[uid]);

            //攻撃エフェクト
            that.hitEffect[uid] = new Sprite(256,256);
            that.hitEffect[uid].image = core.assets[core.PICT_HIT_EFFECT];
            that.hitEffect[uid].x = uid===that.userId ? 128 : -64;
            that.hitEffect[uid].y = 16;
            that.hitEffect[uid].frame = 0;
            that.hitEffect[uid].visible = false;
            that.addChild(that.hitEffect[uid]);
        }

        //攻撃アイコン
        that.atackIcon = new Button('攻撃','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.atackIcon.x = core.COMMAND_POX_X;
        that.atackIcon.y = core.COMMAND_POS_Y;
        that.atackIcon.visible = false;
        that.addChild(that.atackIcon);

        //チャージアイコン
        that.chargeIcon = new Button('チャージ','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.chargeIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        that.chargeIcon.y = core.COMMAND_POS_Y;
        that.chargeIcon.visible = false;
        that.addChild(that.chargeIcon);

        //+アイコン
        that.plusIcon = new Button('+','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.plusIcon.x = core.COMMAND_POX_X;
        that.plusIcon.y = core.COMMAND_POS_Y;
        that.plusIcon.visible = false;
        that.addChild(that.plusIcon);

        //-アイコン
        that.minusIcon = new Button('-','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.minusIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        that.minusIcon.y = core.COMMAND_POS_Y;
        that.minusIcon.visible = false;
        that.addChild(that.minusIcon);

        //決定アイコン
        that.okIcon = new Button('決定','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.okIcon.x = core.COMMAND_POX_X;
        that.okIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        that.okIcon.visible = false;
        that.addChild(that.okIcon);

        //戻るアイコン
        that.prevIcon = new Button('戻る','light',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.prevIcon.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        that.prevIcon.y = core.COMMAND_POS_Y + core.ICON_HEIGHT + 16;
        that.prevIcon.visible = false;
        that.addChild(that.prevIcon);
    }

    return that;
}