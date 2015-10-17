module.exports = function(spec,my){
    var that = new Group();
    var core = enchant.Core.instance;
    var text = spec.text;
    var pict = spec.pict;
    var visible = true;
    var COLOR_WHITE = '111111';
    var COLOR_GRAY = '#FAFAFA';
    var BUTTON_WIDTH = 144;
    var BUTTON_HEIGHT = 48;
    var buttonSprite;
    var buttonLabel = new Label(text);

    init();
    function init(){
        buttonSprite = new Sprite(BUTTON_WIDTH,BUTTON_HEIGHT);
        buttonSprite.image = pict || core.assets[core.PICT_BUTTON];
        that.addChild(buttonSprite);

        buttonLabel = new Label(text);
        buttonLabel.font = "15px 'JapanSans80','ヒラギノ角ゴ Pro W3','Hiragino  Kaku Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック','MS PGothic',sans-serif";
        buttonLabel.color = COLOR_WHITE;
        buttonLabel.x = (BUTTON_WIDTH - buttonLabel._boundWidth)/2;
        buttonLabel.y = (BUTTON_HEIGHT - buttonLabel._boundHeight)/2;
        that.addChild(buttonLabel);
    }

    that.setVisible = function(value){
        visible = value;
        buttonSprite.visible = visible;
        buttonLabel.visible = visible;
    }

    that.getVisible = function() {
        return visible;
    }

    that.getText = function() {
        return buttonLabel.text;
    }

    that.getPict = function(){
        return buttonSprite.image;
    }

    that.setPict = function(p_pict){
        buttonSprite.image = p_pict;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        buttonLabel.color = COLOR_GRAY;
        buttonSprite.frame = 1;
        core.assets[core.SOUND_PUSH_BUTTON].play();
    });

    that.addEventListener(Event.TOUCH_END,function(){
        buttonLabel.color = COLOR_WHITE;
        buttonSprite.frame = 0;
    });

    return that;
}