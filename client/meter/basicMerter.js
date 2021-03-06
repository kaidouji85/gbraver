var __ = require('underscore');
var pictNumber = require('../animation/pictNumber');
var batteryMertor = require('./batteryMertor');
var customBar = require('./customBar');
var specialMerter = require('./specialMerter');

module.exports = function(spec,my) {
    var that = new Group();
    var core = enchant.Core.instance;

    var userId = spec.userId;
    var statusArray = __.clone(spec.statusArray);

    var WIDTH = 320;
    var HEIGHT = 64;
    var MAX_ACTIVE = 5000;
    var MAX_BATTERY = 5;

    (function(){
        that.merterLabel = MerterLabel();
        that.addChild(that.merterLabel);

        that.addChild(NumberBack(0,0));
        that.addChild(NumberBack(0,32));
        that.addChild(NumberBack(0,48));
        that.addChild(NumberBack(WIDTH-core.assets[core.PICT_MINI_NUMBER].width/10*4,0));
        that.addChild(NumberBack(WIDTH-core.assets[core.PICT_MINI_NUMBER].width/10*4,32));
        that.addChild(NumberBack(WIDTH-core.assets[core.PICT_MINI_NUMBER].width/10*4,48));

        that.maxHpArray = __.mapObject(statusArray,function(status){return status.hp});
        that.hpMerterArray = createAndAddObjectArray(HpMerter);
        that.hpNumberArray = createAndAddObjectArray(HpNumber);
        that.activeBarArray = createAndAddObjectArray(ActiveBar);
        that.batteryMerterArray = createAndAddObjectArray(BatteryMerter);
        that.specialMerterArray = createAndAddObjectArray(SpecialMerter);
    })()

    that.setHp = function(uid,hp) {
        that.hpNumberArray[uid].setDamage(hp);

        var width = core.assets[core.PICT_HP_MERTER_UP].width * hp / that.maxHpArray[uid];
        that.hpMerterArray[uid].setValue(width);
    }

    /**
     * オブジェクト配列作成および生成したオブジェクトをシーンに登録する
     *
     * @param creator オブジェクト生成関数
     */
    function createAndAddObjectArray(creator) {
        return __.mapObject(statusArray,function(status,uid){
            var obj = creator(uid);
            that.addChild(obj);
            return obj;
        });
    }

    // ラベル
    function MerterLabel() {
        var base = new Sprite(48,64);
        base.image = core.assets[core.PICT_BASIC_MERTER_BASE];
        base.x = (WIDTH - base.width)/2;
        return base;
    }

    // HPメータ
    function HpMerter(uid) {
        var merter = customBar({
            barImage : core.assets[core.PICT_HP_MERTER_UP],
            backImage : core.assets[core.PICT_HP_MERTER_DOWN],
            direction : userId===uid ? 'right' : 'left'
        });
        merter.x = userId===uid ?
            (WIDTH+core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 :
            (WIDTH-core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 ;
        merter.setValue(core.assets[core.PICT_HP_MERTER_UP].width);
        return merter;
    }

    // HPの数字
    function HpNumber(uid) {
        var hp = pictNumber({
            pict : core.assets[core.PICT_MINI_NUMBER],
            centerPos : 'left'
        });
        hp.x = uid===userId ? WIDTH : core.assets[core.PICT_MINI_NUMBER].width/10*4;
        hp.setDamage(statusArray[uid].hp);
        return hp;
    }

    // 数字のバック
    function NumberBack(x,y) {
        var back = new Sprite(64,16);
        back.image = core.assets[core.PICT_BASIC_MERTER_NUMBER_BACK];
        back.x = x;
        back.y = y;
        return back;
    }

    // アクティブバー
    function ActiveBar(uid) {
        var merter = customBar({
            barImage : core.assets[core.PICT_ACTIVE_MERTER_UP],
            backImage : core.assets[core.PICT_ACTIVE_MERTER_DOWN],
            direction : userId===uid ? 'right' : 'left'
        });
        merter.x = userId===uid ?
        (WIDTH+core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 :
        (WIDTH-core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 ;
        merter.setValue(0);
        merter.y = 16;
        return merter;
    }

    // バッテリーメータ
    function BatteryMerter(uid) {
        var merter = batteryMertor({
            gaugeImage : core.assets[core.PICT_BATTERY_MERTER_UP],
            backImage : core.assets[core.PICT_BATTERY_MERTER_DOWN],
            direction : userId===uid ? 'right' : 'left'
        });

        merter.x = userId===uid ?
        (WIDTH+core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 :
         (WIDTH-core.assets[core.PICT_BASIC_MERTER_BASE].width)/2
         - core.assets[core.PICT_BATTERY_MERTER_UP].width*MAX_BATTERY;

        merter.setValue(MAX_ACTIVE);
        merter.y = 32;
        return merter;
    }

    //特殊ポイントメータ
    function SpecialMerter(uid) {
        var merter = specialMerter({
            ability : statusArray[uid].ability,
            isPlayer : userId===uid
        });
        merter.x = userId===uid ?
        (WIDTH+core.assets[core.PICT_BASIC_MERTER_BASE].width)/2 :
        (WIDTH-core.assets[core.PICT_BASIC_MERTER_BASE].width)/2;
        merter.y = 48;
        return merter;
    }

    return that;
}