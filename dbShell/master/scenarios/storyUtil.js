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

    moveBattle: function(param, routineId) {
        return {
            method : 'moveBattle',
            param : param
        };
    },

    nextScenario: function(scenarioId) {
        return {
            method : 'nextScenario',
            param : scenarioId
        };
    }
};