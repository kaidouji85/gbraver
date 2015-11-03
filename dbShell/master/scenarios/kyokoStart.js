db.scenarios.insert({
    id : 'kyokoStart',
    data :[
        {
            method : 'mes',
            param : '地区大会1回戦'
        },
        {
            method : 'pilot',
            param : {
                id : 'kyoko',
                dir : 'left'
            }
        },
        {
            method : 'mes',
            param :
            '！！<br>' +
            'あの無骨なボディラインは<br>' +
            'ランドーザの初期型じゃない'
        },
        {
            method : 'mes',
            param :
                'カッコいいーー<br>もう、スリスリしちゃおう'
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
        },
        {
            method : 'mes',
            param :
                'ちょっと、そこのあんた<br>人のアームドーザの前で何してんのよ'
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method : 'mes',
            param :
                'ごめんなさい、<br>カッコいいアームドーザだったんで、<br>つい・・・'
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method : 'mes',
            param :
            '試合前なのに随分と余裕じゃない<br>' +
            'いいわ、あんたのその根性、私がキッチリと鍛え直してあげるわ'
        },
        {
            method : 'nextScenario',
            param : 'kyokoSecond'
        },
        {
            method : 'moveBattle',
            param : {
                enemyId : 'landozer',
                pilotId : 'akane',
                routineId : 'attack3-defense1'
            }
        }
    ]
});