db.users.remove({});
db.users.insert({
    userId : 'kaidouji85@gmail.com',
    armdozerId : 'granBraver'
});
db.users.insert({
    userId : 'gbraver85001@gmail.com',
    armdozerId : 'landozer'
});

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
            power : 1200
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1700
        },
        5 : {
            name : 'バスターナックル',
            power : 2000
        }
    }      
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 4000,
    speed : 90,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1500
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1700
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 2000
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 2200
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 2500
        }
    }       
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 2100,
    speed : 150,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1000
        },
        2 : {
            name : 'バスターナックル',
            power : 1200
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1700
        },
        5 : {
            name : 'バスターナックル',
            power : 2000
        }
    }
});