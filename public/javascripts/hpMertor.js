function hpMertor(spec,my){
    var that = new MutableText(0,0);
    
    that.setValue = function(value){
        var text = 'HP ';
        var spaceSize = getSpaceSize(value);
        for(var i=0; i<spaceSize; i++){
            text += ' ';
        }
        text += value;
        that.text = text;
    };
    
    function getSpaceSize(value){
        return 4 - String(value).length;
    }
    
    return that;
}
