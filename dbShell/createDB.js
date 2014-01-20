db.users.remove();
db.users.insert({
    userId : 1,
    status :{
        name : 'グランブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 230,
        weapons : {
            1 : {name:'バスターナックル',power:400},
            2 : {name:'バスターナックル',power:600},
            3 : {name:'バスターナックル',power:1000},
            4 : {name:'バスターナックル',power:1700},
            5 : {name:'バスターナックル',power:2800},
        }
    }
});
db.users.insert({
    userId : 2,
    status :{
        name : 'ランドーザ',
        pictName : 'Landozer.PNG',
        hp : 4700,
        speed : 150,
        weapons : {
            1 : {name:'ブレイクパンチ',power:800},
            2 : {name:'ブレイクパンチ',power:1300},
            3 : {name:'ブレイクパンチ',power:1700},
            4 : {name:'ブレイクパンチ',power:2500},
            5 : {name:'ブレイクパンチ',power:3800}
        }
    }
});