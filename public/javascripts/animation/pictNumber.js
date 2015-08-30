function pictNumber(spec,my){
    var that = new Group();
    var MAX_NUMBER_SPRITE = 6;
    var pict = spec.pict;
    var SPRITE_WIDTH = spec.width || pict.width/10;
    var SPRITE_HEIGHT = spec.height || pict.height;
    var CENTER_POS = spec.centerPos || 'center';
    var numberSpriteArray = new Array(MAX_NUMBER_SPRITE);
    var visible = true;
    var damage=null;

    init();
    function init(){
        for(var i=0; i<MAX_NUMBER_SPRITE; i++){
            numberSpriteArray[i] = new Sprite(SPRITE_WIDTH,SPRITE_HEIGHT);
            numberSpriteArray[i].x = i*32;
            numberSpriteArray[i].image = pict;
            that.addChild(numberSpriteArray[i]);
        }
    }

    //TODO メソッド名をsetValuに変更する
    that.setDamage = function(p_damage){
        if(visible===false) {
            return;
        }
        damage = p_damage > 0 ? p_damage : 0 ;


        var damageStr = damage.toString();
        var digits = damageStr.length;
        var i=0;

        for(;i<MAX_NUMBER_SPRITE; i++){
            if(i<digits){
                numberSpriteArray[i].visible = true;
                numberSpriteArray[i].x = getNumberX(digits,i);
                numberSpriteArray[i].frame = damageStr.substr(i,1);
            } else {
                numberSpriteArray[i].visible = false;
            }
        }
    }

    that.getValue = function(){
        return damage;
    }

    that.setVisible = function(p_visible){
        visible = p_visible;
        for(var i=0; i<MAX_NUMBER_SPRITE; i++){
            numberSpriteArray[i].visible = visible;
        }
    }

    that.getVisible = function(){
        return visible;
    }

    function getNumberX(digits,i) {
        switch(CENTER_POS){
            case 'right':
                return SPRITE_WIDTH*digits + SPRITE_WIDTH*i;
            case 'left':
                return -SPRITE_WIDTH*digits + SPRITE_WIDTH*i;
            case 'center':
            default:
                return -SPRITE_WIDTH*digits/2 + SPRITE_WIDTH*i;
        }
    }

    return that;
}