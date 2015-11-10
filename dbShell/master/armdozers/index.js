load('./dbShell/master/armdozers/createWeapons.js');

/**
 *
 * アームドーザデータを定義
 *
 */

db.armdozers.remove({});
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3000,
    defense : 500,
    speed : 110,
    weapons : createWeapons(1500),
    ability: {
        type : 'boostBattery',
        battery: 3,
        threshold: 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 3300,
    defense : 600,
    speed : 90,
    weapons : createWeapons(1600),
    ability: {
        type: 'boostPower',
        power : 200,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2200,
    defense : 400,
    speed : 140,
    weapons : createWeapons(1600),
    ability: {
        type : 'boostActive',
        active : 0.6,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'guardias',
    name : 'ガーディアス',
    pictName : 'Guardias.png',
    hp : 2300,
    defense : 800,
    speed : 105,
    weapons : createWeapons(1400),
    ability: {
        type : 'hyperShield',
        value : 1000,
        breakedPict : 'GuardiasBreak.png'
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
    weapons : createWeapons(1400),
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
    weapons : createWeapons(1500),
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
    weapons : createWeapons(1900),
    ability: {
        type: 'none'
    }
});