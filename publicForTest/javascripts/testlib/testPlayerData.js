function getTestPlayerData(userId){
    var playerData = {};
    playerData['test001@gmail.com'] =
    {
        name: 'グランブレイバー',
        pictName: 'GranBraver.PNG',
        hp: 3200,
        speed: 250,
        active: 0,
        battery: 5,
        skillPoint : 1,
        weapons: {
            1: {
                name: 'バスターナックル',
                power: 800
            },
            2: {
                name: 'バスターナックル',
                power: 1100
            },
            3: {
                name: 'バスターナックル',
                power: 1600
            },
            4: {
                name: 'バスターナックル',
                power: 2100
            },
            5: {
                name: 'バスターナックル',
                power: 2800
            }
        },
        skill : {
            pilotPict : 'akane.png',
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'quickCharge',
            battery : 3
        }
    };

    playerData['test002@gmail.com'] =
    {
        name: 'ランドーザ',
        pictName: 'Landozer.PNG',
        hp: 4700,
        speed: 150,
        active: 0,
        battery: 5,
        skillPoint : 1,
        weapons: {
            1: {
                name: 'ブレイクパンチ',
                power: 1200
            },
            2: {
                name: 'ブレイクパンチ',
                power: 1700
            },
            3: {
                name: 'ブレイクパンチ',
                power: 2300
            },
            4: {
                name: 'ブレイクパンチ',
                power: 2900
            },
            5: {
                name: 'ブレイクパンチ',
                power: 3800
            }
        },
        skill : {
            pilotPict : 'akane.png',
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'quickCharge',
            battery : 3
        }
    };

    playerData['saikyou@gmail.com'] =
    {
        name : '最強ブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 250,
        active : 0,
        battery : 5,
        skillPoint : 1,
        weapons : {
            1 : {
                name : 'バスターナックル',
                power : 5000
            },
            2 : {
                name : 'バスターナックル',
                power : 5000
            },
            3 : {
                name : 'バスターナックル',
                power : 5000
            },
            4 : {
                name : 'バスターナックル',
                power : 5000
            },
            5 : {
                name : 'バスターナックル',
                power : 5000
            }
        },
        skill : {
            pilotPict : 'iori.png',
            shout: 'この一撃に、全てを掛ける！！',
            type : 'quickCharge',
            battery : 3
        }
    };

    return playerData[userId];
}