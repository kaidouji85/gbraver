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
    hp : 3100,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1200
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