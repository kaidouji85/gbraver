var pilotIcon = require('../button/pilotIcon');

module.exports = function(spec, my) {
    var that = new Group();
    var core = enchant.Core.instance;
    var participants = spec.participants;
    var masterData = spec.masterData;

    (function(){
        var tournamentBase = new Sprite(320, 480);
        tournamentBase.image = core.assets[core.PICT_TOURNAMENT_BASE];
        that.addChild(tournamentBase);

        var pilotData = _.find(masterData.pilotList, function(item){
            return item.id === 'kyoko'
        });
        var pilot = pilotIcon({
            windowPict : core.assets[core.PICT_BLACK_WINDOW],
            pilotPict : core.assets[core.PICT_PREFIX+pilotData.pict],
            pictTopMargin : pilotData.pictTopMargin,
            pictLeftMargin : pilotData.pictLeftMargin,
            scaleX : -1,
            width : 4,
            height : 4
        });
        that.addChild(pilot);
    })();

    return that;
}