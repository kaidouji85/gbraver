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
            power : 1000
        },
        2 : {
            name : 'バスターナックル',
            power : 1000
        },
        3 : {
            name : 'バスターナックル',
            power : 1000
        },
        4 : {
            name : 'バスターナックル',
            power : 1000
        },
        5 : {
            name : 'バスターナックル',
            power : 1000
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
    defense : 650,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1100
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1100
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1100
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1100
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1100
        }
    },
    ability: {
        type: 'none'
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
            power : 1100
        },
        2 : {
            name : 'バスターナックル',
            power : 1100
        },
        3 : {
            name : 'バスターナックル',
            power : 1100
        },
        4 : {
            name : 'バスターナックル',
            power : 1100
        },
        5 : {
            name : 'バスターナックル',
            power : 1100
        }
    },
    ability: {
        type: 'none'
    }
});

db.armdozers.insert({
    armdozerId : 'enemyLandozer',
    cpuOnly : true,
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 800,
    defense : 1000,
    speed : 80,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 700
        },
        2 : {
            name : 'バスターナックル',
            power : 700
        },
        3 : {
            name : 'バスターナックル',
            power : 700
        },
        4 : {
            name : 'バスターナックル',
            power : 700
        },
        5 : {
            name : 'バスターナックル',
            power : 700
        }
    },
    ability: {
        type: 'none'
    }
});

db.armdozers.insert({
    armdozerId : 'enemyGranBraver',
    cpuOnly : true,
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 2500,
    defense : 1000,
    speed : 105,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1000
        },
        2 : {
            name : 'バスターナックル',
            power : 1000
        },
        3 : {
            name : 'バスターナックル',
            power : 1000
        },
        4 : {
            name : 'バスターナックル',
            power : 1000
        },
        5 : {
            name : 'バスターナックル',
            power : 1000
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
    hp : 2800,
    defense : 1000,
    speed : 130,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1800
        },
        2 : {
            name : 'バスターナックル',
            power : 1800
        },
        3 : {
            name : 'バスターナックル',
            power : 1800
        },
        4 : {
            name : 'バスターナックル',
            power : 1800
        },
        5 : {
            name : 'バスターナックル',
            power : 1800
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
    shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
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
    shout : 'まだまだ、勝負はこれからよ。',
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
    shout: 'この一撃に、全てを掛ける！！',
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
    shout: '肉を切らせて骨を断つ',
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
    routineId : 'attack1-defense1'
});
db.stages.insert({
    title : 'グランブレイバーと対決',
    enemyId : 'enemyGranBraver',
    routineId : 'attack3-defense1'
});
db.stages.insert({
    title : 'ゼロブレイバーと対決',
    enemyId : 'enemyZeroBraver',
    routineId : 'attack1-defense3'
});
