var __ = require('underscore');
var ArmdozerSprite = require('../animation/ArmdozerSprite');
var batteryNumber = require('../animation/batteryNumber');
var cutInSprite = require('../animation/cutInSprite');
var damageLabel = require('../animation/damageLabel');
var hitEffect = require('../animation/hitEffect');
var scrollBackGround = require('../animation/scrollBackGround');
var pictButton = require('../button/pictButton');
var pilotIcon = require('../button/pilotIcon');
var basicMerter = require('../meter/basicMerter');
var turnTimer = require('../turnTimer/turnTimer');
var messageWindow = require('../window/messageWindow');

module.exports = function(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var COMMAND_X_1 = 8;
    var COMMAND_X_2 = 168;
    var COMMAND_Y_1 = 358;
    var COMMAND_Y_2 = 422;
    that.statusArray = __.clone(spec.statusArray);
    that.userId = spec.userId;
    that.timeOver = spec.timeOver || 600;
    that.backgroundColor = "black";

    that.charaSpriteArray = {};
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
        that.ground = new Sprite(320,272);
        that.ground.image = core.assets[core.PICT_BG_GROUND];
        that.ground.x = 0;
        that.ground.y = 64;
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
                scaleX : uid===that.userId ? 1 : -1,
                width : 4,
                height : 4
            });
            that.pilotIconArray[uid].x = uid===that.userId ? 256 : 0;
            that.pilotIconArray[uid].y = 64;
            that.addChild(that.pilotIconArray[uid]);

            //キャラクタースプライト
            var spec = {
                pict : core.assets[core.PICT_PREFIX+that.statusArray[uid].pictName],
                direction : uid===that.userId ? 'right' : 'left'
            };
            that.charaSpriteArray[uid] = new ArmdozerSprite(spec);
            that.addChild(that.charaSpriteArray[uid]);
        }

        // フェンス
        that.fence = new Sprite(320,272);
        that.fence.image = core.assets[core.PICT_FENCE];
        that.fence.x = 0;
        that.fence.y = 64;
        that.addChild(that.fence);

        //アームドーザアビリティ発動背景
        that.armdozerAbilityBack = scrollBackGround({
            pict : core.assets[core.PICT_WAKEUP_BACK]
        });
        that.armdozerAbilityBack.y = 64;
        that.armdozerAbilityBack.setVisible(false);
        that.armdozerAbilityBack.setOpacity(0.7);
        that.addChild(that.armdozerAbilityBack);

        for(var uid in that.statusArray){
            //アームドーザ発動時のアップ画像
            if(that.statusArray[uid].ability.type!=='none'){
                      that.armdozerAbilityCutInArray[uid] = cutInSprite({
                    width : 256,
                    height : 256,
                    image : core.assets[core.PICT_PREFIX+'wakeUp'+that.statusArray[uid].pictName]
                });
                that.armdozerAbilityCutInArray[uid].x = 0;
                that.armdozerAbilityCutInArray[uid].y = 80;
                that.armdozerAbilityCutInArray[uid].scaleX = uid===that.userId ? 1 : -1;
                that.armdozerAbilityCutInArray[uid].visible = false;
                that.addChild(that.armdozerAbilityCutInArray[uid]);
            }
        }

        // 基本ゲージ
        that.merter = basicMerter({
            userId : that.userId,
            statusArray : that.statusArray
        });
        that.addChild(that.merter);

        for(var uid in that.statusArray){
            //出したバッテリー
            that.batteryNumberArray[uid] = batteryNumber({
                pict : core.assets[core.PICT_BATTERY_NUMBER]
            });
            that.batteryNumberArray[uid].x = uid===that.userId ? 226 : 30;
            that.batteryNumberArray[uid].y = 170;
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
            that.pilotSpriteArray[uid] = cutInSprite({
                width : 256,
                height : 256,
                image : core.assets[core.PICT_PREFIX+that.statusArray[uid].pilot.pict]
            });
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
        that.battleEndIcon.x = (COMMAND_X_1 + COMMAND_X_2)/2;
        that.battleEndIcon.y = (COMMAND_Y_1 + COMMAND_Y_2)/2;
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
        that.winSprite.y = 270;
        that.winSprite.visible = false;
        that.addChild(that.winSprite);

        //LOSE画像
        that.loseSprite = new Sprite(313,56);
        that.loseSprite.image = core.assets[core.PICT_LOSE];
        that.loseSprite.x = (core.width - that.loseSprite.width)/2;
        that.loseSprite.y = 270;
        that.loseSprite.visible = false;
        that.addChild(that.loseSprite);

        //ターンタイマー
        that.playerTurnTimer = turnTimer();
        that.playerTurnTimer.x = 160;
        that.playerTurnTimer.y = 240;
        that.playerTurnTimer.setVisible(false);
        that.addChild(that.playerTurnTimer);
    }())

    that.getName = function(){
        return 'battle';
    }

    that.refreshMertor = function(statusArray){
        for(var uid in statusArray){
            that.merter.setHp(uid,statusArray[uid].hp);
            that.merter.batteryMerterArray[uid].setValue(statusArray[uid].battery);
            that.merter.activeBarArray[uid].setValue(core.assets[core.PICT_ACTIVE_MERTER_UP].width
                *statusArray[uid].active/5000);
            that.merter.specialMerterArray[uid].setValue(statusArray[uid].specialPoint);
        }
    }

    return that;
}