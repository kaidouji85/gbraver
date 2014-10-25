function battleSceneBase(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var COMMAND_X_1 = 8;
    var COMMAND_X_2 = 168;
    var COMMAND_Y_1 = 350;
    var COMMAND_Y_2 = 414;
    that.statusArray = $.extend(true, {}, spec.statusArray);
    that.userId = spec.userId;
    that.backgroundColor = "black";
    that.sky = {};
    that.ground = {};
    that.atackIcon = {};
    that.chargeIcon = {};
    that.plusIcon = {};
    that.minusIcon = {};
    that.okIcon = {};
    that.prevIcon = {};
    that.skillIcon = {};
    that.charaSpriteArray = {};
    that.hpMertorArray = {};
    that.activeBarArray = {};
    that.batteryMertorArray = {};
    that.batteryNumberArray = {};
    that.damageLabelArray = {};
    that.subDamageLabelArray = {};
    that.pilotSpriteArray = {};
    that.hitEffect = {};
    that.mesWindow = {};

    that.refreshMertor = function(statusArray){
        for(var uid in statusArray){
            that.hpMertorArray[uid].setValue(statusArray[uid].hp);
            that.batteryMertorArray[uid].setValue(statusArray[uid].battery);
            that.activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    initSprite();
    function initSprite() {
        //背景(地面)
        that.ground = new Sprite(320,256);
        that.ground.image = core.assets[core.PICT_BG_GROUND];
        that.ground.x = 0;
        that.ground.y = 80;
        that.addChild(that.ground);

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
            that.hpMertorArray[uid].y = 10;
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
            that.activeBarArray[uid].y = 30;
            that.addChild(that.activeBarArray[uid]);

            //バッテリーメータ
            that.batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[core.PICT_BATTERY_GAUGE],
                backImage : core.assets[core.PICT_BATTERY_BACK],
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.batteryMertorArray[uid].x = uid===that.userId ? 190 : 10;
            that.batteryMertorArray[uid].y = 50;
            that.batteryMertorArray[uid].setValue(5);
            that.addChild(that.batteryMertorArray[uid]);
        }

        for(var uid in that.statusArray){
            //出したバッテリー
            that.batteryNumberArray[uid] = new Sprite(64,64);
            that.batteryNumberArray[uid].image = core.assets[core.PICT_BATTERY_NUMBER];
            that.batteryNumberArray[uid].x = uid===that.userId ? 226 : 30;
            that.batteryNumberArray[uid].y = 190;
            that.batteryNumberArray[uid].visible = false;
            that.addChild(that.batteryNumberArray[uid]);

            //ダメージラベル
            that.damageLabelArray[uid] = damageLabel({
                pict : core.assets[core.PICT_DAMAGE]
            });
            that.damageLabelArray[uid].x = uid===that.userId ? 240 : 80;
            that.damageLabelArray[uid].y = 270;
            that.damageLabelArray[uid].setVisible(false);
            that.addChild(that.damageLabelArray[uid]);

            //ヒット種別
            that.subDamageLabelArray[uid] = new Sprite(128,24);
            that.subDamageLabelArray[uid].image = core.assets[core.PICT_HIT_TEXT];
            that.subDamageLabelArray[uid].x = uid===that.userId ? 176 : 16;
            that.subDamageLabelArray[uid].y = 300;
            that.subDamageLabelArray[uid].visible = false;
            that.addChild(that.subDamageLabelArray[uid]);

            //攻撃エフェクト
            that.hitEffect[uid] = hitEffect({
                pict : core.assets[core.PICT_HIT_EFFECT]
            });
            that.hitEffect[uid].x = uid===that.userId ? 128 : -64;
            that.hitEffect[uid].y = 96;
            that.addChild(that.hitEffect[uid]);

            //パイロット
            that.pilotSpriteArray[uid] = new Sprite(256,256);
            that.pilotSpriteArray[uid].image = core.assets[core.PICT_PREFIX+that.statusArray[uid].skill.pilotPict];
            that.pilotSpriteArray[uid].x = uid===that.userId ? 128 : -64;
            that.pilotSpriteArray[uid].y = 80;
            that.pilotSpriteArray[uid].scaleX = uid===that.userId ? 1 : -1;
            that.pilotSpriteArray[uid].visible = false;
            that.addChild(that.pilotSpriteArray[uid]);
        }

        //攻撃アイコン
        that.atackIcon = pictButton({
            text : '攻撃',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.atackIcon.x = COMMAND_X_1;
        that.atackIcon.y = COMMAND_Y_1;
        that.atackIcon.setVisible(false);
        that.addChild(that.atackIcon);

        //チャージアイコン
        that.chargeIcon = pictButton({
            text : 'チャージ',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.chargeIcon.x = COMMAND_X_2;
        that.chargeIcon.y = COMMAND_Y_1;
        that.chargeIcon.setVisible(false);
        that.addChild(that.chargeIcon);

        //パイロットスキルアイコン
        that.skillIcon = pictButton({
            text : 'スキル',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.skillIcon.x = COMMAND_X_1;
        that.skillIcon.y = COMMAND_Y_2;
        that.skillIcon.setVisible(false);
        that.addChild(that.skillIcon);

        //+アイコン
        that.plusIcon = pictButton({
            text : '+',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.plusIcon.x = COMMAND_X_1;
        that.plusIcon.y = COMMAND_Y_1;
        that.plusIcon.setVisible(false);
        that.addChild(that.plusIcon);

        //-アイコン
        that.minusIcon = pictButton({
            text : '-',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.minusIcon.x = COMMAND_X_2;
        that.minusIcon.y = COMMAND_Y_1;
        that.minusIcon.setVisible(false);
        that.addChild(that.minusIcon);

        //決定アイコン
        that.okIcon = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.okIcon.x = COMMAND_X_1;
        that.okIcon.y = COMMAND_Y_2;
        that.okIcon.setVisible(false);
        that.addChild(that.okIcon);

        //戻るアイコン
        that.prevIcon = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.prevIcon.x = COMMAND_X_2;
        that.prevIcon.y = COMMAND_Y_2;
        that.prevIcon.setVisible(false);
        that.addChild(that.prevIcon);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW],
            height :144
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = 336;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    }

    return that;
}