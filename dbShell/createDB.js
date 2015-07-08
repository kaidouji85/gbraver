//db.users.remove({});

db.armdozers.remove({});
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3000,
    defense : 500,
    speed : 110,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1500
        },
        2 : {
            name : 'バスターナックル',
            power : 1500
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1500
        },
        5 : {
            name : 'バスターナックル',
            power : 1500
        }
    },
    ability: {
        type : 'boostBattery',
        battery: 2,
        threshold: 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 3300,
    defense : 600,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1600
        }
    },
    ability: {
        type: 'boostPower',
        power : 100,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2600,
    defense : 400,
    speed : 140,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1600
        },
        2 : {
            name : 'バスターナックル',
            power : 1600
        },
        3 : {
            name : 'バスターナックル',
            power : 1600
        },
        4 : {
            name : 'バスターナックル',
            power : 1600
        },
        5 : {
            name : 'バスターナックル',
            power : 1600
        }
    },
    ability: {
        type : 'boostActive',
        active : 0.3,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'guardias',
    name : 'ガーディアス',
    pictName : 'Guardias.png',
    hp : 2100,
    defense : 800,
    speed : 100,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1400
        },
        2 : {
            name : 'バスターナックル',
            power : 1400
        },
        3 : {
            name : 'バスターナックル',
            power : 1400
        },
        4 : {
            name : 'バスターナックル',
            power : 1400
        },
        5 : {
            name : 'バスターナックル',
            power : 1400
        }
    },
    ability: {
        type : 'hyperArmor',
        value : 0
    }
});

db.armdozers.insert({
    armdozerId : 'enemyLandozer',
    cpuOnly : true,
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 800,
    defense : 500,
    speed : 80,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1400
        },
        2 : {
            name : 'バスターナックル',
            power : 1400
        },
        3 : {
            name : 'バスターナックル',
            power : 1400
        },
        4 : {
            name : 'バスターナックル',
            power : 1400
        },
        5 : {
            name : 'バスターナックル',
            power : 1400
        }
    },
    ability: {
        type: 'boostPower',
        power : 100,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'enemyGranBraver',
    cpuOnly : true,
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 2500,
    defense : 500,
    speed : 105,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1500
        },
        2 : {
            name : 'バスターナックル',
            power : 1500
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1500
        },
        5 : {
            name : 'バスターナックル',
            power : 1500
        }
    },
    ability: {
        type: 'none'
    }
});

db.armdozers.insert({
    armdozerId : 'enemyZeroBraver',
    cpuOnly : true,
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2400,
    defense : 400,
    speed : 130,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1900
        },
        2 : {
            name : 'バスターナックル',
            power : 1900
        },
        3 : {
            name : 'バスターナックル',
            power : 1900
        },
        4 : {
            name : 'バスターナックル',
            power : 1900
        },
        5 : {
            name : 'バスターナックル',
            power : 1900
        }
    },
    ability: {
        type: 'none'
    }
});

db.pilots.remove({});
db.pilots.insert({
    id : 'kyoko',
    name : '恭子',
    pict : 'kyoko.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout : '10年早いわ・・・・・・、なんてね',
    type : 'quickCharge',
    battery : 2,
    hp : 200,
    power : 50,
    defense : 50,
    speed : 20
});

db.pilots.insert({
    id : 'akane',
    name : '茜',
    pict : 'akane.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout : 'まぁ、当然の結果ね',
    type : 'recoverHp',
    value : 0.2,
    hp : 400,
    power : 50,
    defense : 50,
    speed : 10
});

db.pilots.insert({
    id : 'iori',
    name: '伊織',
    pict: 'iori.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout: '・・・・・・勝った',
    type: 'guardBreak',
    value : 100,
    hp : 200,
    power : 100,
    defense : 50,
    speed : 10
});

db.pilots.insert({
    id : 'akira',
    name: '晶',
    pict: 'akira.png',
    pictTopMargin : 32,
    pictLeftMargin : 64,
    shout: 'やった、僕の勝ちだ',
    type: 'superGuard',
    value : 0.5,
    hp : 200,
    power : 50,
    defense : 100,
    speed : 10
});

db.stages.remove({});
db.stages.insert({
    title : 'ランドーザと対決',
    enemyId : 'enemyLandozer',
    pilotId : 'akira',
    routineId : 'attack1-defense1'
});
db.stages.insert({
    title : 'グランブレイバーと対決',
    enemyId : 'enemyGranBraver',
    pilotId : 'iori',
    routineId : 'attack3-defense1'
});
db.stages.insert({
    title : 'ゼロブレイバーと対決',
    enemyId : 'enemyZeroBraver',
    pilotId : 'akane',
    routineId : 'zeroBraver'
});

db.scenarios.remove({});
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
            method : 'activePilot',
            param : 'left'
        },
        {
            method : 'mes',
            param :
                'さすが地区大会<br>アームドーザがこんなにたくさん'
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
            method: 'mes',
            param: 'あかねスタート'
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