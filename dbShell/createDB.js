db.users.remove({});

db.armdozers.remove({});
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3000,
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
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1000
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1000
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1000
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1000
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1000
        }
    }       
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2100,
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
    title : '初級',
    enemyId : 'landozer',
    routineId : 'attack3'
});
db.stages.insert({
    title : '中級',
    enemyId : 'granBraver',
    routineId : 'attack3'
});
db.stages.insert({
    title : '上級',
    enemyId : 'zeroBraver',
    routineId : 'attack3'
});