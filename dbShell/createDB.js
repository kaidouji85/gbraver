db.users.remove();
db.users.insert({
    userId : 'kaidouji85@gmail.com',
    armdozerId : 'granBraver'
});
db.users.insert({
    userId : 'gbraver85001@gmail.com',
    armdozerId : 'landozer'
});

db.armdozers.remove();
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3200,
    speed : 230,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 800
        },
        2 : {
            name : 'バスターナックル',
            power : 1100
        },
        3 : {
            name : 'バスターナックル',
            power : 1600
        },
        4 : {
            name : 'バスターナックル',
            power : 2100
        },
        5 : {
            name : 'バスターナックル',
            power : 2800
        },
    }      
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 4700,
    speed : 150,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1700
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 2300
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 2900
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 3800
        }
    }       
});