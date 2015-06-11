//db.users.remove({});

db.armdozers.remove({});
db.armdozers.insert({
    armdozerId : 'granBraver',
    name : 'グランブレイバー',
    pictName : 'GranBraver.PNG',
    hp : 3000,
    defense : 500,
    speed : 110,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1500
        },
        2 : {
            name : 'バスターナックル',
            power : 1500
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1500
        },
        5 : {
            name : 'バスターナックル',
            power : 1500
        }
    },
    ability: {
        type : 'boostBattery',
        battery: 2,
        threshold: 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 3300,
    defense : 600,
    speed : 95,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 1600
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 1600
        }
    },
    ability: {
        type: 'boostPower',
        power : 100,
        threshold : 0.4
    }
});

db.armdozers.insert({
    armdozerId : 'zeroBraver',
    name : 'ゼロブレイバー',
    pictName : 'ZeroBraver.PNG',
    hp : 2600,
    defense : 400,
    speed : 140,
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1600
        },
        2 : {
            name : 'バスターナックル',
            power : 1600
        },
        3 : {
            name : 'バスターナックル',
            power : 1600
        },
        4 : {
            name : 'バスターナックル',
            power : 1600
        },
        5 : {
            name : 'バスターナックル',
            power : 1600
        }
    },
    ability: {
        type : 'boostActive',
        active : 0.3,
        threshold : 0.4
    }
});

db.armdozers.insert({
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
        type : 'hyperArmor',
        value : 0
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
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1500
        },
        2 : {
            name : 'バスターナックル',
            power : 1500
        },
        3 : {
            name : 'バスターナックル',
            power : 1500
        },
        4 : {
            name : 'バスターナックル',
            power : 1500
        },
        5 : {
            name : 'バスターナックル',
            power : 1500
        }
    },
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
    weapons : {
        1 : {
            name : 'バスターナックル',
            power : 1900
        },
        2 : {
            name : 'バスターナックル',
            power : 1900
        },
        3 : {
            name : 'バスターナックル',
            power : 1900
        },
        4 : {
            name : 'バスターナックル',
            power : 1900
        },
        5 : {
            name : 'バスターナックル',
            power : 1900
        }
    },
    ability: {
        type: 'none'
    }
});

db.pilots.remove({});
db.pilots.insert({
    id : 'kyoko',
    name : '恭子',
    pict : 'kyoko.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout : '10年早いわ・・・・・・、なんてね',
    type : 'quickCharge',
    battery : 2,
    hp : 200,
    power : 50,
    defense : 50,
    speed : 20
});

db.pilots.insert({
    id : 'akane',
    name : '茜',
    pict : 'akane.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout : 'まぁ、当然の結果ね',
    type : 'recoverHp',
    value : 0.2,
    hp : 400,
    power : 50,
    defense : 50,
    speed : 10
});

db.pilots.insert({
    id : 'iori',
    name: '伊織',
    pict: 'iori.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout: '・・・・・・勝った',
    type: 'guardBreak',
    value : 100,
    hp : 200,
    power : 100,
    defense : 50,
    speed : 10
});

db.pilots.insert({
    id : 'akira',
    name: '晶',
    pict: 'akira.png',
    pictTopMargin : 32,
    pictLeftMargin : 64,
    shout: 'あんた、結構強かったよ',
    type: 'superGuard',
    value : 0.5,
    hp : 200,
    power : 50,
    defense : 100,
    speed : 10
});

db.stages.remove({});
db.stages.insert({
    title : 'ランドーザと対決',
    enemyId : 'enemyLandozer',
    pilotId : 'akira',
    routineId : 'attack1-defense1'
});
db.stages.insert({
    title : 'グランブレイバーと対決',
    enemyId : 'enemyGranBraver',
    pilotId : 'iori',
    routineId : 'attack3-defense1'
});
db.stages.insert({
    title : 'ゼロブレイバーと対決',
    enemyId : 'enemyZeroBraver',
    pilotId : 'akane',
    routineId : 'zeroBraver'
});

db.scenarios.remove({});
db.scenarios.insert({
    id : 'start',
    data :[
        {
            method : 'mes',
            param :
                'この度はストーリーモードを遊んで頂き、誠にありがとうございます。'
        },
        {
            method : 'mes',
            param :
                '本モードは現在β版のため、一旦ストーリーモードに入ると途中で抜けてることができません。'
        },
        {
            method : 'mes',
            param :
            'お手数ではございますが、ブラウザを閉じて下さい。'
        },
        {
            method : 'mes',
            param :
                'また、ストーリー進行機能が未実装のため、同じストーリーの無限再生が続きます。'
        },
        {
            method : 'mes',
            param :
                'それではストーリーモードをお楽しみ下さい。'
        },
        {
            method : 'mes',
            param : '・・・・・・'
        },
        {
            method : 'pilot',
            param : {
                id : 'kyoko',
                dir : 'left'
            }
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method : 'mes',
            param :
                'ここが大会の会場ね。' +
                '地区大会の初戦だから全然人いないと思ったけど、そうでもないのね'
        },
        {
            method : 'mes',
            param :
                '今回は初参戦だから1、２回戦まで突破できれば上出来かな。'
        },

        {
            method : 'pilot',
            param : {
                id : 'akane',
                dir : 'right'
            }
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method : 'mes',
            param :
            'あなたが私の対戦相手かしら。' +
            '去年は見かけなかったけど、もしかし大会は初めて？'
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method : 'mes',
            param :
                'だとしたら、あなたも運が無いわね。' +
                '初戦の相手が、前回県大会ベスト16のこの私なんだから。'
        },
        {
            method : 'mes',
            param :
                '可哀想だけど一瞬でカタをつけさせてもうらうわ。'
        },
        {
            method : 'activePilot',
            param : 'left'
        },
        {
            method: 'mes',
            param: 'まさか初戦でこんな相手に当たるなんて。'
        },
        {
            method : 'mes',
            param :
            'でも、くよくよしてられない。勝つ方法を考えるんだ。'
        },
        {
            method : 'mes',
            param :
                '前に試合をビデオで見たことがあるけど、 確かあのチームは攻撃重視のスタイルだったはず。'
        },
        {
            method : 'mes',
            param :
                'なら、こっちは防御に徹して、隙をついて攻撃すれば勝機はあるわ。'
        },
        {
            method : 'activePilot',
            param : 'right'
        },
        {
            method : 'mes',
            param :
                '準備はいいかしら？<br>' +
                'じゃあ、いくわよ！！'
        },
        {
            method : 'nextScenario',
            param : 'second'
        },
        {
            method : 'moveBattle',
            param : {
                enemyId : 'landozer',
                pilotId : 'akane',
                routineId : 'attack3-defense1'
            }
        }
    ]
});

db.scenarios.insert({
    id : 'second',
    data :[
        {
            method : 'mes',
            param :
                '2番目のストーリー'
        },
        {
            method : 'nextScenario',
            param : 'second'
        },
        {
            method : 'moveBattle',
            param : {
                enemyId : 'landozer',
                pilotId : 'akane',
                routineId : 'attack3-defense1'
            }
        }
    ]
});