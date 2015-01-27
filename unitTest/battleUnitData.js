var ce = require('cloneextend');

function battleUnitData() {
    var that = {};
    var unitData = {};

    (function(){
        unitData['granBraver'] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 5,
            overHeatFlag : false,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            }
        };

        unitData['landozer'] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 150,
            active: 0,
            battery: 5,
            overHeatFlag : false,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        };

        unitData['landozerDefense200'] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 200,
            speed: 150,
            active: 0,
            battery: 5,
            overHeatFlag : false,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            }
        }
    })()

    that.get = function(unitId){
        return ce.clone(unitData[unitId]);
    }

    return that;
}

module.exports = battleUnitData;