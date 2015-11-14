module.exports = function(spec,my){
    var that = {};
    var scenarioData = [];

    scenarioData.push({
        id : 'mesTest',
        data : [
            {
                method : 'mes',
                param :
                '春日野高校の恭子よ<br>'+
                'アームドーザの操縦には、結構自信があるんだ<br>'+
                'お互いにベストを尽くしましょう'
            },
            {
                method : 'mes',
                param :
                'でかい口叩けるのも、今のうちよ<br>'+
                '私のランドーザが最強なんだから'
            },
        ]
    });

    scenarioData.push({
        id : 'pilotLeftTest',
        data : [
            {
                method : 'pilot',
                param : {
                    id : 'kyoko',
                    dir : 'left'
                }
            }
        ]
    });

    scenarioData.push({
        id : 'pilotRightTest',
        data : [
            {
                method : 'pilot',
                param : {
                    id : 'akane',
                    dir : 'right'
                }
            }
        ]
    });

    scenarioData.push({
        id : 'activeLeftPilotTest',
        data : [
            {
                method : 'pilot',
                param : {
                    id : 'kyoko',
                    dir : 'left'
                }
            },
            {
                method : 'pilot',
                param : {
                    id : 'akane',
                    dir : 'right'
                }
            },
            {
                method : 'activePilot',
                param : 'left'
            }
        ]
    });

    scenarioData.push({
        id : 'activeRightPilotTest',
        data :[
            {
                method : 'pilot',
                param : {
                    id : 'kyoko',
                    dir : 'left'
                }
            },
            {
                method : 'pilot',
                param : {
                    id : 'akane',
                    dir : 'right'
                }
            },
            {
                method : 'activePilot',
                param : 'right'
            }
        ]
    });

    scenarioData.push({
        id : 'activeNoPilotTest',
        data : [
            {
                method : 'pilot',
                param : {
                    id : 'kyoko',
                    dir : 'left'
                }
            },
            {
                method : 'pilot',
                param : {
                    id : 'akane',
                    dir : 'right'
                }
            },
            {
                method : 'activePilot',
                param : 'no'
            }
        ]
    });

    scenarioData.push({
        id : 'moveBattleTest',
        data : [
            {
                method : 'mes',
                param :
                'でかい口叩けるのも、今のうちよ<br>'+
                '私のランドーザが最強なんだから'
            },
            {
                method : 'moveBattle',
                param : {
                    enemyId : 'landozer',
                    pilotId : 'akane',
                    routineId : 'attack3',
                    player: {
                        armdozerId: 'granBraver',
                        pilotId: 'kyoko'
                    }
                }
            }
        ]
    });

    scenarioData.push({
        id : 'moveStoryToBattle',
        data : [
            {
                method : 'pilot',
                param : {
                    id : 'kyoko',
                    dir : 'left'
                }
            },
            {
                method : 'pilot',
                param : {
                    id : 'akane',
                    dir : 'right'
                }
            },
            {
                method : 'activePilot',
                param : 'left'
            },
            {
                method : 'mes',
                param :
                '春日野高校の恭子よ<br>'+
                'アームドーザの操縦には、結構自信があるんだ<br>'+
                'お互いにベストを尽くしましょう'
            },
            {
                method : 'activePilot',
                param : 'right'
            },
            {
                method : 'mes',
                param :
                'でかい口叩けるのも、今のうちよ<br>'+
                '私のランドーザが最強なんだから'
            },
            {
                method : 'moveBattle',
                param : {
                    enemyId : 'landozer',
                    pilotId : 'akane',
                    routineId : 'attack3'
                }
            }
        ]
    });

    scenarioData.push({
        id : 'nextScenarioTest',
        data : [
            {
                method : 'mes',
                param :
                '次のストーリーに進みます'
            },
            {
                method : 'nextScenario',
                param : 'nextScenarioId'
            }
        ]
    });

    scenarioData.push({
        id : '' +
        'first',
        data : [
            {
                method : 'mes',
                param :
                '春日野高校の恭子よ<br>'+
                'アームドーザの操縦には、結構自信があるんだ<br>'+
                'お互いにベストを尽くしましょう'
            },
            {
                method : 'mes',
                param :
                'でかい口叩けるのも、今のうちよ<br>'+
                '私のランドーザが最強なんだから'
            },
        ]
    });

    that.getMasterData = function(){
        return scenarioData;
    }

    that.getData = function(scenarioId){
        for(var i in scenarioData){
            if( scenarioData[i].id === scenarioId ){
                return scenarioData[i].data;
            }
        }
    }

    return that;
}