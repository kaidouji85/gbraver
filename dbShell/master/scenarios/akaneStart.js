db.scenarios.insert({
    id : 'akaneStart',
    data :[
        {
            method : 'mes',
            param : '地区大会1回戦'
        },
        {
            method : 'pilot',
            param : {
                id : 'akane',
                dir : 'left'
            }
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param: '初っ端からブレイバーシリーズに当たるなんて、<br>私もつくづく運がないわね'
        },
        {
            method: 'mes',
            param: '・・・・・・って凡人なら考えるんでしょうけど、<br>天才の私には関係ないわ'
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
            param: 'あなたレアなアームドーザに乗ってるわね'
        },
        {
            method: 'mes',
            param: '私が勝ったらスリスリさせてもらってもいい？'
        },
        {
            method : 'nextScenario',
            param : 'akaneStart'
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