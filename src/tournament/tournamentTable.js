var pilotIcon = require('../button/pilotIcon');
var __ = require('underscore');

var TOURNAMENT_TABLE_WIDTH = 192;
var TOURNAMENT_TABLE_HEIGHT = 304;
var PILOT_ICON_WIDTH = 64;
var INTERVAL = 16;

module.exports = function(spec, my) {
    var that = new Group();
    var core = enchant.Core.instance;
    var participants = spec.participants;
    var masterData = spec.masterData;

    (function(){
        var tournamentBase = new Sprite(TOURNAMENT_TABLE_WIDTH, TOURNAMENT_TABLE_HEIGHT);
        tournamentBase.image = core.assets[core.PICT_TOURNAMENT_BASE];
        tournamentBase.x = 64;
        that.addChild(tournamentBase);

        __.each(participants, function(pilot, index){
            var isLeft = __.contains([0,1,2,3], index);
            var icon = createPilot(pilot.pilotId, isLeft ? -1 : 1);
            icon.x = isLeft ? 0 : TOURNAMENT_TABLE_WIDTH + PILOT_ICON_WIDTH;
            icon.y = (isLeft ? index : index - 4)* (PILOT_ICON_WIDTH + INTERVAL);
            that.addChild(icon);
        });

    })();

    function createPilot(id, scale) {
        var pilotData = __.find(masterData.pilotList, function(item){
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