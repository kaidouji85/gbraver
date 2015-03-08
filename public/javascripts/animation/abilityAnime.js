function abilityAnime(spec,my){
    var that = spec.battleScene;
    var core = enchant.Core.instance;

    that.play = function(data,fn){
        var playerId = data.playerId;
        that.tl.then(function(){
            that.refreshMertor(data.statusArray);
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(getArmdozerAbilityDescription(that.statusArray[playerId].ability));
            that.armdozerAbilityBack.setVisible(true);
            that.armdozerAbilityCutInArray[playerId].visible = true;
            cutInAnime();
        }).delay(120).then(function(){
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            that.armdozerAbilityBack.setVisible(false);
            that.armdozerAbilityCutInArray[playerId].visible = false;
            fn();
        });

        function cutInAnime(){
            var dir = that.armdozerAbilityCutInArray[playerId].scaleX>0 ? 1 : -1;
            var targetX = dir>0 ? 40 : -40;
            that.armdozerAbilityCutInArray[playerId].y = 80;
            that.armdozerAbilityCutInArray[playerId].x = dir>0 ? 320 : -320;
            that.armdozerAbilityCutInArray[playerId].tl.moveTo(targetX,80,10);
        }
    }

    return that;
}