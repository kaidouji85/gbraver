var getSkillDescription = require('../others/skillDescription').getSkillDescription;

module.exports = function(spec,my){
    var that = {};
    var battleScene = spec.battleScene;
    var core = enchant.Core.instance;

    battleScene.play = function(attackUserId,data,fn){
        var dir = battleScene.pilotSpriteArray[attackUserId].scaleX>0 ? 1 : -1;
        battleScene.refreshMertor(data.statusArray);

        battleScene.tl.then(function(){
            battleScene.refreshMertor(data.statusArray);
            battleScene.mesWindow.setVisible(true);
            battleScene.mesWindow.setText(getSkillDescription(battleScene.statusArray[attackUserId].pilot));

            var speed = dir>0 ? -6 : 6;
            battleScene.armdozerAbilityBack.setVisible(true);
            battleScene.armdozerAbilityBack.setSpeed(speed);

            battleScene.executePilotSKillSprite.visible=true;

            battleScene.pilotSpriteArray[attackUserId].visible = true;
            battleScene.pilotSpriteArray[attackUserId].play();
            //cutInAnime();

        }).delay(120).then(function(){
            if(attackUserId === battleScene.userId){
                battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            } else {
                battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMAND);
            }
            battleScene.armdozerAbilityBack.setVisible(false);
            battleScene.pilotSpriteArray[attackUserId].visible = false;
            battleScene.executePilotSKillSprite.visible=false;
            fn();
        });
    }

    return battleScene;
}