function myTurnAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;
    var core = enchant.Core.instance;

    that.play = function(data,fn){
        var attackUserId = data.atackUserId;

        battleScene.tl.then(function(){
            battleScene.charaSpriteArray[attackUserId].doMyTurnMotion();
        }).delay(3).then(function(){
            core.assets[core.SOUND_MY_TURN].play();
        }).delay(12).then(fn);
    }

    return that;
}