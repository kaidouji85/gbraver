function abilityAnime(spec,my){
    var that = spec.battleScene;
    var core = enchant.Core.instance;

    that.play = function(data,fn){
        var playerId = data.playerId;
        that.tl.then(function(){
            that.refreshMertor(data.statusArray);
            that.mesWindow.setVisible(true);
            that.mesWindow.setText(getArmdozerAbilityDescription(that.statusArray[playerId].ability));
            that.charaSpriteArray[playerId].doMyTurnMotion();
            that.armdozerAbilityBack.visible = true;
            that.armdozerAbilityCutInArray[playerId].visible = true;
        }).delay(120).then(function(){
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            that.charaSpriteArray[playerId].doStandMotion();
            that.armdozerAbilityBack.visible = false;
            that.armdozerAbilityCutInArray[playerId].visible = false;
            fn();
        });
    }

    return that;
}