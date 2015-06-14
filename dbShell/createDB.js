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
    shout: 'あんた、結構強かったよ',
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
    id : 'start',
    data :[
        {
            method : 'mes',
            param :
                '本モードは現在β版のため、<br>' +
                '一旦ストーリーモードに入ると<br>' +
                '途中で抜けてることができません。'
        },
        {
            method : 'mes',
            param :
                'お手数ですが、<br>' +
                'ブラウザを閉じて下さい。'
        },
        {
            method : 'mes',
            param :
                'それでは<br>ストーリーモードを<br>お楽しみ下さい。'
        },
        {
            method : 'mes',
            param : '・・・・・・'
        },
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
                'カッコいいーー<br>ああ、スリスリしたい'
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
                'カッコいい<br>' +
                'この私のアームドーザが・・・・・・'
        },
        {
            method : 'mes',
            param :
                'へ、へぇ<br>' +
                '結構、見る目があるじゃない'
        },
        {
            method : 'mes',
            param :
                'いいわ、<br>' +
                '試合が始まるまで<br>' +
                '好きなだけ見てちょうだい'
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method : 'mes',
            param :
                '初戦の相手はランドーザか<br>' +
                '厄介な相手だわ'
        },
        {
            method : 'mes',
            param :
                '旧式で動きは遅いけど、<br>' +
                'パワー、装甲ともに上位レベルの機体<br>'+
                'まともに殴り合うのは不利ね'
        },
        {
            method : 'mes',
            param :
                '基本は回避、防御に徹して、<br>' +
                'バッテリーが切れになったところを<br>' +
                '攻撃するしかないか'
        },
        {
            method : 'nextScenario',
            param : 'second'
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
    id : 'second',
    data :[
        {
            method : 'mes',
            param :
                'ごめん、<br>今週はシナリオの打ち込みをする<br>時間がなかったんだ'
        },
        {
            method : 'mes',
            param :
                'だから唐突に戦闘に<br>なるけど許してね'
        },
        {
            method : 'nextScenario',
            param : 'second'
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