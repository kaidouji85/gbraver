function hpMertor(spec,my){
    var that = new MutableText(0,0);
    var hp = 0;

    that.setValue = function(value){
        hp = value>=0 ? value : 0;
        setHpMertor(hp);
    };

    that.getValue = function(){
        return hp;
    }

    function setHpMertor(value){
        var text = 'HP ';
        var spaceSize = getSpaceSize(value);
        for(var i=0; i<spaceSize; i++){
            text += ' ';
        }
        text += value;
        that.text = text;
    }
    
    function getSpaceSize(value){
        return 5 - String(value).length;
    }
    
    return that;
}
