db.scenarios.insert({
    id : 'ioriStart',
    data :[
        {
            method : 'mes',
            param : '地区大会1回戦'
        },
        {
            method : 'pilot',
            param : {
                id : 'iori',
                dir : 'left'
            }
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param: '初めての試合で緊張するです<br>私にうまくできるのかな'
        },
        {
            method : 'pilot',
            param : {
                id : 'kyoko',
                dir : 'right'
            }
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method: 'mes',
            param: '私の名前は恭子、新入り同士お互いに頑張ろうね'
        },
        {
            method : 'nextScenario',
            param : 'ioriStart'
        },
        {
            method : 'moveBattle',
            param : {
                enemyId : 'granBraver',
                pilotId : 'kyoko',
                routineId : 'attack3-defense1'
            }
        }
    ]
});