/**
 * ストーリー関連のユーテイリティ
 *
 */
var storyUtil = {
    mes: function(message){
        return {
            method : 'mes',
            param : message
        };
    },

    pilot: function(id,dir){
        return {
            method : 'pilot',
            param : {
                id : id,
                dir : dir
            }
        };
    },

    activePilot: function(dir) {
        return {
            method : 'activePilot',
            param : dir
        }
    },

    moveBattle: function(enemyId, pilotId, routineId) {
        return {
            method : 'moveBattle',
            param : {
                enemyId : enemyId,
                pilotId : pilotId,
                routineId : routineId
            }
        };
    },

    nextScenario: function(scenarioId) {
        return {
            method : 'nextScenario',
            param : scenarioId
        };
    }
};