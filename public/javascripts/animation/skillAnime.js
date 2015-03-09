function skillAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;
    var core = enchant.Core.instance;

    battleScene.play = function(attackUserId,data,fn){
        battleScene.refreshMertor(data.statusArray);

        battleScene.tl.then(function(){
            battleScene.pilotSpriteArray[attackUserId].visible = true;
            battleScene.mesWindow.setVisible(true);
            battleScene.mesWindow.setText(getSkillDescription(battleScene.statusArray[attackUserId].pilot));
        }).delay(120).then(function(){
            battleScene.pilotSpriteArray[attackUserId].visible = false;
            battleScene.mesWindow.setVisible(true);
            if(attackUserId === battleScene.userId){
                battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            } else {
                battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMAND);
            }

            fn();
        });
    }

    return battleScene;
}