module.exports = function(spec,my){
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
            userId : 'saikyou@gmail.com',
            armdozerId : 'saikyouBraver',
            pilotId : 'kyoko'
        },
        {
            userId : 'test004@gmail.com',
            armdozerId : 'granBraverForQuickCharge',
            pilotId : 'kyoko'
        },
        {
            userId : 'test005@gmail.com',
            armdozerId : 'guardias',
            pilotId : 'iori'
        }
    ];


    var armdozerArray = [
        {
            armdozerId : 'granBraver',
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
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
            },
            ability: {
                type : 'boostBattery',
                battery: 5,
                threshold: 0.3
            }
        },
        {
            armdozerId : 'landozer',
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
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
            },
            ability: {
                type: 'none'
            }
        },
        {
            armdozerId : 'saikyouBraver',
            name: '最強ブレイバー',
            pictName: 'ZeroBraver.PNG',
            hp: 4700,
            defense : 0,
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
            },
            ability: {
                type: 'none'
            }
        },
        {
            armdozerId : 'granBraverForQuickCharge',
            name : 'グランブレイバー(クイックチャージ)',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
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
            },
            ability: {
                type: 'none'
            }
        },
        {
            armdozerId : 'guardias',
            name : 'ガーディアス',
            pictName : 'Guardias.png',
            hp : 2100,
            defense : 800,
            speed : 100,
            weapons : {
                1 : {
                    name : 'バスターナックル',
                    power : 1400
                },
                2 : {
                    name : 'バスターナックル',
                    power : 1400
                },
                3 : {
                    name : 'バスターナックル',
                    power : 1400
                },
                4 : {
                    name : 'バスターナックル',
                    power : 1400
                },
                5 : {
                    name : 'バスターナックル',
                    power : 1400
                }
            },
            ability: {
                type : 'hyperShield',
                value : 1000,
                breakedPict : 'GuardiasBreak.png'
            }
        }
    ];

    var pilotArray = [
        {
            id : 'kyoko',
            name : '恭子',
            pict : 'kyoko.png',
            pictTopMargin : 0,
            pictLeftMargin : 64,
            shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
            type : 'quickCharge',
            battery : 3,
            hp : 100,
            power : 100,
            defense : 100,
            speed : 15
        },
        {
            id : 'akane',
            name : '茜',
            pict : 'akane.png',
            pictTopMargin : 0,
            pictLeftMargin : 64,
            shout : 'まだまだ、勝負はこれからよ。',
            type : 'recoverHp',
            value : 0.5,
            hp : 400,
            power : 50,
            defense : 200,
            speed : 5
        },
        {
            id : 'iori',
            name: '伊織',
            pict: 'iori.png',
            pictTopMargin : 0,
            pictLeftMargin : 64,
            shout: 'この一撃に、全てを掛ける！！',
            type: 'guardBreak',
            value : 500,
            hp : 100,
            power : 300,
            defense : 100,
            speed : 5
        },
        {
            id : 'akira',
            name: '晶',
            pict: 'akira.png',
            pictTopMargin :32,
            pictLeftMargin : 64,
            shout: '肉を切らせて骨を断つ',
            type: 'guardBreak',
            value : 500,
            hp : 100,
            power : 100,
            defense : 300,
            speed : 5
        }
    ];

    var stageData = [
        {
            title : '初級',
            enemyId : 'landozer',
            pilotId : 'kyoko',
            routineId : 'attack3'
        },
        {
            title : '中級',
            enemyId : 'granBraver',
            pilotId : 'akane',
            routineId : 'attack3'
        },
        {
            title : '上級',
            enemyId : 'zeroBraver',
            pilotId : 'iori',
            routineId : 'attack3'
        }
    ];

    that.getUserData = function(userId,cb){
        return searchUser(userId);
    }

    that.getPlayerData = function(userId,cb){
        var userData = searchUser(userId);
        var armdozerData = searchArmdozer(userData.armdozerId);
        var pilotData = searchPilot(userData.pilotId);
        var playerData = {
            userId : userId,
            status : armdozerData
        };
        playerData.status.pilot = pilotData;
        delete playerData.status.armdozerId;
        delete playerData.status.pilot.id;
        return playerData;
    }

    that.getArmdozerData = function(armdozerId,cb){
        var armdozerData = searchArmdozer(armdozerId);
        return armdozerData;
    }

    that.getMasterData = function(cb){
        var masterData = {
            armdozerList : armdozerArray,
            pilotList : pilotArray
        };
        return masterData;
    }

    that.getStageData = function(){
        return stageData;
    }

    function searchUser(userId){
        for(var i=0; i<userArray.length; i++){
            if(userId===userArray[i].userId){
                return $.extend(true, {}, userArray[i]);
            }
        }
    }

    function searchArmdozer(armdozerId){
        for(var i=0; i<armdozerArray.length; i++){
            if(armdozerArray[i].armdozerId === armdozerId){
                return $.extend(true, {}, armdozerArray[i]);
            }
        }
    }

    function searchPilot(pilotId){
        for(var i=0; i<pilotArray.length; i++){
            if(pilotArray[i].id===pilotId){
                return $.extend(true, {}, pilotArray[i]);
            }
        }
    }

    return that;
}