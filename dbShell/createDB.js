db.users.remove({});

db.armdozers.remove({});
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3000,
    defense : 150,
    speed : 110,
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
    }      
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 3300,
    defense : 200,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1300
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1300
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1300
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1300
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1300
        }
    }       
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2500,
    defense : 50,
    speed : 145,
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
    }
});

db.armdozers.insert({
    armdozerId : 'enemyLandozer',
    cpuOnly : true,
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 800,
    defense : 100,
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
    }
});

db.armdozers.insert({
    armdozerId : 'enemyGranBraver',
    cpuOnly : true,
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 2500,
    defense : 150,
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
    }
});

db.armdozers.insert({
    armdozerId : 'enemyZeroBraver',
    cpuOnly : true,
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2800,
    defense : 200,
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
    }
});

db.pilots.remove({});
db.pilots.insert({
    id : 'kyoko',
    name : '恭子',
    pict : 'kyoko.png',
    shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
    type : 'quickCharge',
    battery : 3,
    hp : 150,
    power : 80,
    defense : -50,
    speed : 10
});

db.pilots.insert({
    id : 'akane',
    name : '茜',
    pict : 'akane.png',
    shout : 'まだまだ、勝負はこれからよ。',
    type : 'recoverHp',
    value : 0.3,
    hp : 100,
    power : 150,
    defense : -20,
    speed : 5
});

db.pilots.insert({
    id : 'iori',
    name: '伊織',
    pict: 'iori.png',
    shout: 'この一撃に、全てを掛ける！！',
    type: 'guardBreak',
    value : 200,
    hp : 50,
    power : 50,
    defense : -10,
    speed : 15
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
