function battleSceneBase(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var COMMAND_X_1 = 8;
    var COMMAND_X_2 = 168;
    var COMMAND_Y_1 = 358;
    var COMMAND_Y_2 = 422;
    that.statusArray = $.extend(true, {}, spec.statusArray);
    that.userId = spec.userId;
    that.backgroundColor = "black";

    that.charaSpriteArray = {};
    that.hpMertorArray = {};
    that.activeBarArray = {};
    that.batteryMertorArray = {};
    that.batteryNumberArray = {};
    that.damageLabelArray = {};
    that.subDamageLabelArray = {};
    that.pilotSpriteArray = {};
    that.pilotIconArray = {};
    that.hitEffectArray = {};
    that.mertorWindowArray = {};
    that.armdozerAbilityCutInArray = {};

    (function() {
        //背景(地面)
        that.ground = new Sprite(320,256);
        that.ground.image = core.assets[core.PICT_BG_GROUND];
        that.ground.x = 0;
        that.ground.y = 80;
        that.addChild(that.ground);

        //コマンドウインドウ
        that.commandWindow =  new Sprite(320,144);
        that.commandWindow.image = core.assets[core.PICT_COMMAND_WINDOW];
        that.commandWindow.x = 0;
        that.commandWindow.y = 336;
        that.addChild(that.commandWindow);

        for(var uid in that.statusArray){
            //パイロットアイコン
            that.pilotIconArray[uid] = pilotIcon({
                windowPict : core.assets[core.PICT_BLACK_WINDOW],
                pilotPict : core.assets[core.PICT_PREFIX+that.statusArray[uid].pilot.pict],
                pictTopMargin : that.statusArray[uid].pilot.pictTopMargin,
                pictLeftMargin : that.statusArray[uid].pilot.pictLeftMargin,
                scaleX : uid===that.userId ? 1 : -1
            });
            that.pilotIconArray[uid].x = uid===that.userId ? 240 : 0;
            that.pilotIconArray[uid].y = 80;
            that.addChild(that.pilotIconArray[uid]);

            //キャラクタースプライト
            var spec = {
                pict : core.assets[core.PICT_PREFIX+that.statusArray[uid].pictName],
                direction : uid===that.userId ? 'right' : 'left'
            };
            that.charaSpriteArray[uid] = new ArmdozerSprite(spec);
            that.addChild(that.charaSpriteArray[uid]);
        }

        //アームドーザアビリティ発動背景
        that.armdozerAbilityBack = scrollBackGround({
            pict : core.assets[core.PICT_WAKEUP_BACK]
        });
        that.armdozerAbilityBack.y = 80;
        that.armdozerAbilityBack.setVisible(false);
        that.addChild(that.armdozerAbilityBack);

        for(var uid in that.statusArray){
            //アームドーザ発動時のアップ画像
            if(that.statusArray[uid].ability.type!=='none'){
                that.armdozerAbilityCutInArray[uid] = new Sprite(320,256);
                that.armdozerAbilityCutInArray[uid].image = core.assets[core.PICT_PREFIX+'wakeUp'+that.statusArray[uid].pictName];
                that.armdozerAbilityCutInArray[uid].x = 0;
                that.armdozerAbilityCutInArray[uid].y = 80;
                that.armdozerAbilityCutInArray[uid].scaleX = uid===that.userId ? 1 : -1;
                that.armdozerAbilityCutInArray[uid].visible = false;
                that.addChild(that.armdozerAbilityCutInArray[uid]);
            }
        }

        for(var uid in that.statusArray){
            //ウインドウ
            that.mertorWindowArray[uid] = gridWindow({
                pict : core.assets[core.PICT_BLACK_WINDOW],
                width : 10,
                height : 5
            });
            that.mertorWindowArray[uid].x = uid===that.userId ? 160 : 0;
            that.mertorWindowArray[uid].y = 0;
            that.addChild(that.mertorWindowArray[uid]);

            //HPメータ
            that.hpMertorArray[uid] = hpMertor();
            that.hpMertorArray[uid].y = 10;
            that.hpMertorArray[uid].x = uid===that.userId ? 170 : 10;
            that.hpMertorArray[uid].setValue(that.statusArray[uid].hp);
            that.addChild(that.hpMertorArray[uid]);

            //アクティブゲージ
            that.activeBarArray[uid] = customBar({
                barImage : core.assets[core.PICT_ACTIVE_BAR],
                backImage : core.assets[core.PICT_ACTIVE_BAR_BACK],
                maxValue : 120,
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.activeBarArray[uid].x = uid===that.userId ? 170 : 130;
            that.activeBarArray[uid].y = 30;
            that.addChild(that.activeBarArray[uid]);

            //バッテリーメータ
            that.batteryMertorArray[uid] = new batteryMertor({
                gaugeImage : core.assets[core.PICT_BATTERY_GAUGE],
                backImage : core.assets[core.PICT_BATTERY_BACK],
                direction : uid===that.userId ? 'right' : 'left'
            });
            that.batteryMertorArray[uid].x = uid===that.userId ? 170 : 10;
            that.batteryMertorArray[uid].y = 50;
            that.batteryMertorArray[uid].setValue(5);
            that.addChild(that.batteryMertorArray[uid]);

            //出したバッテリー
            that.batteryNumberArray[uid] = batteryNumber({
                pict : core.assets[core.PICT_BATTERY_NUMBER]
            });
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
            that.hitEffectArray[uid] = hitEffect({
                pict : core.assets[core.PICT_HIT_EFFECT]
            });
            that.hitEffectArray[uid].x = uid===that.userId ? 128 : -64;
            that.hitEffectArray[uid].y = 96;
            that.addChild(that.hitEffectArray[uid]);

            //パイロット
            that.pilotSpriteArray[uid] = new Sprite(256,256);
            that.pilotSpriteArray[uid].image = core.assets[core.PICT_PREFIX+that.statusArray[uid].pilot.pict];
            that.pilotSpriteArray[uid].x = uid===that.userId ? 128 : -64;
            that.pilotSpriteArray[uid].y = 80;
            that.pilotSpriteArray[uid].scaleX = uid===that.userId ? 1 : -1;
            that.pilotSpriteArray[uid].visible = false;
            that.addChild(that.pilotSpriteArray[uid]);
        }

        //アームドーザアビリティ発動テロップ
        that.executeAbilitySprite = new Sprite(320,64);
        that.executeAbilitySprite.image = core.assets[core.PICT_EXECUTE_ABILITY_TELOP];
        that.executeAbilitySprite.x = 0;
        that.executeAbilitySprite.y = 270;
        that.executeAbilitySprite.visible = false;
        that.addChild(that.executeAbilitySprite);

        //パイロットスキル発動テロップ
        that.executePilotSKillSprite = new Sprite(320,64);
        that.executePilotSKillSprite.image = core.assets[core.PICT_EXECUTE_SKILL_TELOP];
        that.executePilotSKillSprite.x = 0;
        that.executePilotSKillSprite.y = 270;
        that.executePilotSKillSprite.visible = false;
        that.addChild(that.executePilotSKillSprite);

        //攻撃アイコン
        that.atackIcon = pictButton({
            text : '攻撃',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.atackIcon.x = COMMAND_X_1;
        that.atackIcon.y = COMMAND_Y_1;
        that.atackIcon.setVisible(false);
        that.addChild(that.atackIcon);

        //チャージアイコン
        that.chargeIcon = pictButton({
            text : 'チャージ',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.chargeIcon.x = COMMAND_X_2;
        that.chargeIcon.y = COMMAND_Y_1;
        that.chargeIcon.setVisible(false);
        that.addChild(that.chargeIcon);

        //パイロットスキルアイコン
        that.skillIcon = pictButton({
            text : 'スキル',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.skillIcon.x = COMMAND_X_1;
        that.skillIcon.y = COMMAND_Y_2;
        that.skillIcon.setVisible(false);
        that.addChild(that.skillIcon);

        //+アイコン
        that.plusIcon = pictButton({
            text : '+',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.plusIcon.x = COMMAND_X_1;
        that.plusIcon.y = COMMAND_Y_1;
        that.plusIcon.setVisible(false);
        that.addChild(that.plusIcon);

        //-アイコン
        that.minusIcon = pictButton({
            text : '-',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.minusIcon.x = COMMAND_X_2;
        that.minusIcon.y = COMMAND_Y_1;
        that.minusIcon.setVisible(false);
        that.addChild(that.minusIcon);

        //決定アイコン
        that.okIcon = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.okIcon.x = COMMAND_X_1;
        that.okIcon.y = COMMAND_Y_2;
        that.okIcon.setVisible(false);
        that.addChild(that.okIcon);

        //戻るアイコン
        that.prevIcon = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.prevIcon.x = COMMAND_X_2;
        that.prevIcon.y = COMMAND_Y_2;
        that.prevIcon.setVisible(false);
        that.addChild(that.prevIcon);

        //戦闘終了アイコン
        that.battleEndIcon  = pictButton({
            text : '戦闘終了',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.battleEndIcon.x = 88;
        that.battleEndIcon.y = 382;
        that.battleEndIcon.setVisible(false);
        that.addChild(that.battleEndIcon);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW],
            height : 144
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = 336;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);

        //WIN画像
        that.winSprite = new Sprite(202,56);
        that.winSprite.image = core.assets[core.PICT_WIN];
        that.winSprite.x = (core.width - that.winSprite.width)/2;
        that.winSprite.y = 260;
        that.winSprite.visible = false;
        that.addChild(that.winSprite);

        //LOSE画像
        that.loseSprite = new Sprite(313,56);
        that.loseSprite.image = core.assets[core.PICT_LOSE];
        that.loseSprite.x = (core.width - that.loseSprite.width)/2;
        that.loseSprite.y = 260;
        that.loseSprite.visible = false;
        that.addChild(that.loseSprite);
    }())

    that.getName = function(){
        return 'battle';
    }

    that.refreshMertor = function(statusArray){
        for(var uid in statusArray){
            that.hpMertorArray[uid].setValue(statusArray[uid].hp);
            that.batteryMertorArray[uid].setValue(statusArray[uid].battery);
            that.activeBarArray[uid].setValue(120*statusArray[uid].active/5000);
        }
    }

    return that;
}