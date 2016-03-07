var pilotIcon = require('../button/pilotIcon');

module.exports = function(spec, my) {
    var that = new Group();
    var core = enchant.Core.instance;
    var participants = spec.participants;
    var masterData = spec.masterData;

    (function(){
        var tournamentBase = new Sprite(192, 336);
        tournamentBase.image = core.assets[core.PICT_TOURNAMENT_BASE];
        tournamentBase.x = 64;
        that.addChild(tournamentBase);

        _.each(participants, function(item, dir1){
            _.each(item, function(item, dir2){
                _.each(item, function(item, dir3){
                    var pilot = createPilot(item.pilotId, dir1==='right' ? 1 : -1);
                    pilot.x = dir1 === 'right' ? 192 + 64 : 0;
                    pilot.y = (dir2 === 'up' ? 0 : 160+16) + (dir3 === 'up' ? 0 : 96);
                    that.addChild(pilot);
                });
            });
        });
    })();

    function createPilot(id, scale) {
        var pilotData = _.find(masterData.pilotList, function(item){
            return item.id === id
        });
        return pilotIcon({
            windowPict : core.assets[core.PICT_BLACK_WINDOW],
            pilotPict : core.assets[core.PICT_PREFIX+pilotData.pict],
            pictTopMargin : pilotData.pictTopMargin,
            pictLeftMargin : pilotData.pictLeftMargin,
            scaleX : scale,
            width : 4,
            height : 4
        });
    }

    return that;
}