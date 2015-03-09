function abilityAnime(spec,my){
    var that = {};
    var battleScene = spec.battleScene;
    var core = enchant.Core.instance;

    that.play = function(data,fn){
        var playerId = data.playerId;
        var dir = battleScene.armdozerAbilityCutInArray[playerId].scaleX>0 ? 1 : -1;

        battleScene.tl.then(function(){
            battleScene.refreshMertor(data.statusArray);
            battleScene.mesWindow.setVisible(true);
            battleScene.mesWindow.setText(getArmdozerAbilityDescription(battleScene.statusArray[playerId].ability));

            var speed = dir>0 ? -6 : 6;
            battleScene.armdozerAbilityBack.setVisible(true);
            battleScene.armdozerAbilityBack.setSpeed(speed);

            battleScene.armdozerAbilityCutInArray[playerId].visible = true;
            cutInAnime();

            battleScene.executeAbilitySprite.visible = true;
        }).delay(120).then(function(){
            battleScene.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            battleScene.armdozerAbilityBack.setVisible(false);
            battleScene.armdozerAbilityCutInArray[playerId].visible = false;
            battleScene.executeAbilitySprite.visible = false;
            fn();
        });

        function cutInAnime(){
            var targetX = dir>0 ? 40 : -40;
            battleScene.armdozerAbilityCutInArray[playerId].y = 80;
            battleScene.armdozerAbilityCutInArray[playerId].x = dir>0 ? 200 : -200;
            battleScene.armdozerAbilityCutInArray[playerId].tl.moveTo(targetX,80,10);
        }
    }

    return that;
}