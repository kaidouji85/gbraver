function specialMerterConfig(spec,my) {
    var that = {};
    var ability = spec.ability;

    that.getMaxValue = function() {
        switch(ability.type){
            case 'hyperShield':
                return ability.value;
            default:
                return 0;
        }
    }

    that.getInitialValue = function(){
        switch(ability.type){
            case 'hyperShield':
                return ability.value;
            default:
                return 0;
        }
    }

    that.isViewNumber = function(){
        switch(ability.type){
            case 'hyperShield':
                return true;
            default:
                return false;
        }
    }

    return that;
}