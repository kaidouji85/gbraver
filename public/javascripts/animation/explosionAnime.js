function explosionAnime(spec,my){
    var that = {};
    var core = enchant.Core.instance;
    var battleScene = spec.battleScene;

    that.play = function(data,fn){
        battleScene.refreshMertor(data.statusArray);
        battleScene.mesWindow.setVisible(false);
        for(var uid in data.statusArray){
            if( uid !== data.winner ){
                battleScene.charaSpriteArray[uid].doDownMotion();
                break;
            }
        }
        battleScene.tl.delay(130).then(function(){
            data.winner === battleScene.userId ? battleScene.winSprite.visible=true : battleScene.loseSprite.visible = true;
            battleScene.pilotSpriteArray[data.winner].visible = true;
            battleScene.pilotSpriteArray[data.winner].play();
            battleScene.mesWindow.setText(battleScene.statusArray[data.winner].pilot.shout);
            battleScene.mesWindow.setVisible(true);
        }).delay(80).then(function(){
            fn();
        });
    }

    return that;
}