function testScenarioData(){
    var scenarioData = {};

    scenarioData['mesTest'] = [
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
    ];

    scenarioData['pilotLeftTest'] = [
        {
            method : 'pilot',
            param : {
                id : 'kyoko',
                dir : 'left'
            }
        }
    ];

    scenarioData['pilotRightTest'] = [
        {
            method : 'pilot',
            param : {
                id : 'akane',
                dir : 'right'
            }
        }
    ];

    scenarioData['activeLeftPilotTest'] = [
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
    ];

    scenarioData['activeRightPilotTest'] = [
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
    ];

    scenarioData['activeNoPilotTest'] = [
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
    ];

    scenarioData['moveBattleTest'] = [
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
    ];

    scenarioData['moveStoryToBattle'] = [
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
    ];


    return scenarioData;
}