function myTurnAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;

    that.play = function(data,fn){
        var attackUserId = data.attackUserId;

        battleScene.tl.then(function(){
            battleScene.charaSpriteArray[attackUserId].doMyTurnMotion();
        }).delay(60).then(fn);
    }

    return that;
}