function explosionAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;

    that.play = function(data,fn){
        for(var uid in data.statusArray){
            if( uid !== data.winner ){
                battleScene.charaSpriteArray[uid].doDownMotion();
                break;
            }
        }
        battleScene.tl.delay(130).then(function(){
            data.winner === battleScene.userId ? battleScene.winSprite.visible=true : battleScene.loseSprite.visible = true;
        }).delay(80).then(function(){
            fn();
        });
    }

    return that;
}