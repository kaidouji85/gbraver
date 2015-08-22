function specialMerter(spec,my) {
    var that = new Group();
    var core = enchant.Core.instance;

    var isPlayer = spec.isPlayer;
    var ability = spec.ability;
    var config = specialMerterConfig({
        ability : ability
    });

    (function(){
        that.merterBar = MerterBar();
        that.addChild(that.merterBar);

        that.addChild(NumberBack());

        that.number = Number();
        that.addChild(that.number);
    })()

    that.getMaxValue = config.getMaxValue;

    //特殊ポイントメータ
    function MerterBar() {
        var merter = customBar({
            barImage : core.assets[core.PICT_SPECIAL_MERTER_UP],
            backImage : core.assets[core.PICT_SPECIAL_MERTER_DOWN],
            direction : isPlayer ? 'right' : 'left'
        });
        var value = config.getInitialValue()/config.getMaxValue()*core.assets[core.PICT_SPECIAL_MERTER_UP].width;
        merter.setValue(value);
        return merter;
    }

    // 数字のバック
    function NumberBack() {
        var back = new Sprite(64,16);
        back.image = core.assets[core.PICT_BASIC_MERTER_NUMBER_BACK];
        back.x = isPlayer ? core.assets[core.PICT_SPECIAL_MERTER_UP].width :
            -core.assets[core.PICT_SPECIAL_MERTER_UP].width -core.assets[core.PICT_BASIC_MERTER_NUMBER_BACK].width ;
        return back;
    }

    // 数字
    function Number(uid) {
        var ret = pictNumber({
            pict: core.assets[core.PICT_MINI_NUMBER],
            centerPos: 'left'
        });
        ret.x = isPlayer ?
        core.assets[core.PICT_SPECIAL_MERTER_UP].width + core.assets[core.PICT_BASIC_MERTER_NUMBER_BACK].width :
            -core.assets[core.PICT_SPECIAL_MERTER_UP].width;
        ret.setVisible(config.isViewNumber());
        ret.setDamage(config.getInitialValue());

        return ret;
    }

    return that;
}