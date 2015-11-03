db.scenarios.insert({
    id : 'akiraStart',
    data :[
        {
            method : 'mes',
            param : '地区大会1回戦'
        },
        {
            method : 'pilot',
            param : {
                id : 'akira',
                dir : 'left'
            }
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param: '駆動系、バッテリーゲイン、全てオールグリーン<br>ガーディアス、バトルオン！！'
        },
        {
            method: 'mes',
            param: '大丈夫、今までやってきたことを出し切れば絶対に勝てる'
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
            param: 'なんてカッコイイ、アームドーザなのかしら<br>ああ、ペロペロしたい'
        },
        {
            method: 'mes',
            param: 'いけない、ついヨダレが・・・・・・'
        },
        {
            method : 'nextScenario',
            param : 'akiraStart'
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