enchant();
window.onload = function() {
    var data = {
        2 : {
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
        },
        1 : {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            speed : 250,
            active : 0,
            battery : 5,
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
        }
    };

    var Game = game({
        statusArray : data,
        userId : '1'
    });
    Game.start();
    Game.onReady(function() {
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : '1',
            turn : 10,
            statusArray : {
                2 : {
                    hp : 4700,
                    battery : 5,
                    active : 1500
                },
                1 : {
                    hp : 3200,
                    battery : 5,
                    active : 5000
                }
            }
        };
        Game.doWaitPhase(waitPhaseData);
    });

};
