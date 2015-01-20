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
        }).delay(80).then(function(){
            battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            battleScene.mesWindow.setVisible(true);
            fn();
        });
    }

    return that;
}