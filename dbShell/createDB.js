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
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 3500,
    defense : 100,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 900
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 900
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 900
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 900
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 900
        }
    }       
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2500,
    defense : 200,
    speed : 125,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1200
        },
        2 : {
            name : 'バスターナックル',
            power : 1200
        },
        3 : {
            name : 'バスターナックル',
            power : 1200
        },
        4 : {
            name : 'バスターナックル',
            power : 1200
        },
        5 : {
            name : 'バスターナックル',
            power : 1200
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
    battery : 3
});

db.pilots.insert({
    id : 'akane',
    name : '茜',
    pict : 'akane.png',
    shout : 'まだまだ、勝負はこれからよ。',
    type : 'recoverHp',
    value : 0.5
});

db.pilots.insert({
    id : 'iori',
    name: '伊織',
    pict: 'iori.png',
    shout: 'この一撃に、全てを掛ける！！',
    type: 'guardBreak'
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
