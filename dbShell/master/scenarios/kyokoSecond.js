db.scenarios.insert({
    id : 'kyokoSecond',
    data :[
        {
            method : 'mes',
            param :
                '地区大会2回戦'
        },
        {
            method : 'pilot',
            param : {
                id : 'kyoko',
                dir : 'left'
            }
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param : '!!<br>' +
            'あれは、この前ロールアウトされたばかりのガーディアスじゃない<br>'+
            'こんな、ところでお目にかかれるなんて'
        },
        {
            method : 'pilot',
            param : {
                id : 'akira',
                dir : 'right'
            }
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method: 'mes',
            param : 'ちょっと、そこの君<br>もうすぐ試合の時間なんだけど'
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param : 'あっ、ごめんなさい<br>私ったらアームドーザのことになったらつい・・・・・・'
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method: 'mes',
            param : '周りが見えなくなる程、君は好きなことに熱中できるのか<br>いいね、そういうの嫌いじゃないないよ'
        },
        {
            method: 'mes',
            param : '僕の名前は晶<br>この試合、お互いにベストを尽くそうじゃないか'
        },
        {
            method : 'nextScenario',
            param : 'kyokoSecond'
        },
        {
            method : 'moveBattle',
            param : {
                enemyId : 'guardias',
                pilotId : 'akira',
                routineId : 'attack3-defense1'
            }
        }
    ]
});