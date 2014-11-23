var ce = require('cloneextend');

function dbMock(spec,my){
    var that = {};

    var userArray = [
        {
            userId : 'test001@gmail.com',
            armdozerId : 'granBraver',
            pilotId : 'kyoko'
        },
        {
            userId : 'test002@gmail.com',
            armdozerId : 'landozer',
            pilotId : 'akane'
        },
        {
            userId : 'test003@gmail.com',
            armdozerId : 'saikyouBraver',
            pilotId : 'kyoko'
        },
        {
            userId : 'test004@gmail.com',
            armdozerId : 'granBraverForQuickCharge',
            pilotId : 'kyoko'
        }
    ];


    var armdozerArray = [
        {
            armdozerId : 'granBraver',
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            speed : 500,
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
                }
            }
        },
        {
            armdozerId : 'landozer',
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            speed : 300,
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
        },
        {
            armdozerId : 'saikyouBraver',
            name: '最強ブレイバー',
            pictName: 'Landozer.PNG',
            hp: 4700,
            speed: 1000,
            weapons: {
                1: {
                    name: 'ブレイクパンチ',
                    power: 5000
                },
                2: {
                    name: 'ブレイクパンチ',
                    power: 5000
                },
                3: {
                    name: 'ブレイクパンチ',
                    power: 5000
                },
                4: {
                    name: 'ブレイクパンチ',
                    power: 5000
                },
                5: {
                    name: 'ブレイクパンチ',
                    power: 5000
                }
            }
        },
        {
            armdozerId : 'granBraverForQuickCharge',
            name : 'グランブレイバー(クイックチャージ)',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            speed : 1000,
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
                }
            }
        }
    ];

    var pilotArray = [
        {
            id : 'kyoko',
            name : '恭子',
            pict : 'kyoko.png',
            shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
            type : 'quickCharge',
            battery : 3
        },
        {
            id : 'akane',
            name : '茜',
            pict : 'akane.png',
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'recoverHp',
            value : 0.5
        },
        {
            id : 'iori',
            name: '伊織',
            pict: 'iori.png',
            shout: 'この一撃に、全てを掛ける！！',
            type: 'guardBreak'
        }
    ];

    var stageData = [
        {
            title : '初級',
            enemyId : 'landozer',
            routineId : 'attack3'
        },
        {
            title : '中級',
            enemyId : 'granBraver',
            routineId : 'attack3'
        },
        {
            title : '上級',
            enemyId : 'zeroBraver',
            routineId : 'attack3'
        }
    ];

    that.getUserData = function(userId,cb){
        var userData = searchUser(userId);
        cb(null,userData);
    }

    that.getPlayerData = function(userId,cb){
        var userData = searchUser(userId);
        var playerData = createUnitData(userData.userId, userData.armdozerId, userData.pilotId);
        cb(null,playerData);
    }

    that.getArmdozerData = function(armdozerId,cb){
        var armdozerData = searchArmdozer(armdozerId);
        cb(null,armdozerData);
    }

    that.getMasterData = function(cb){
        var masterData = {
            armdozerList : armdozerArray,
            pilotList : pilotArray,
            stageData : stageData
        };
        cb(null,masterData);
    }

    that.getEnemyData = function(armdozerId,pilotId,cb){
        var enemyData = createUnitData('nonePlayerCharacter', armdozerId, pilotId);
        cb(null,enemyData);
    }

    function searchUser(userId){
        for(var i=0; i<userArray.length; i++){
            if(userId===userArray[i].userId){
                return ce.clone(userArray[i]);
            }
        }
    }

    function searchArmdozer(armdozerId){
        for(var i=0; i<armdozerArray.length; i++){
            if(armdozerArray[i].armdozerId === armdozerId){
                return ce.clone(armdozerArray[i]);
            }
        }
    }

    function searchPilot(pilotId){
        for(var i=0; i<pilotArray.length; i++){
            if(pilotArray[i].id===pilotId){
                return ce.clone(pilotArray[i]);
            }
        }
    }

    function createUnitData(userId,armdozerId,pilotId){
        var armdozerData = searchArmdozer(armdozerId);
        var pilotData = searchPilot(pilotId);
        var unitData = {
            userId : userId,
            status : armdozerData
        };
        unitData.status.skill = pilotData;
        delete unitData.status.armdozerId;
        delete unitData.status.skill.id;
        return unitData;
    }

    return that;
}

module.exports = dbMock;