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
        }).delay(250).then(function(){
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            that.armdozerAbilityBack.setVisible(false);
            that.armdozerAbilityCutInArray[playerId].visible = false;
            fn();
        });

        function cutInAnime(){
            that.armdozerAbilityCutInArray[playerId].y = -128;
            that.armdozerAbilityCutInArray[playerId].tl.delay(40).moveTo(0,80,120);
        }
    }

    return that;
}