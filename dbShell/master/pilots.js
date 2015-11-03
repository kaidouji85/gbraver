/**
 *
 * パイロットデータを定義
 *
 */

db.pilots.remove({});
db.pilots.insert({
    id : 'kyoko',
    name : '恭子',
    pict : 'kyoko.png',
    pictTopMargin : 0,
    pictLeftMargin : 64,
    shout : '10年早いぜ、なんてね',
    type : 'quickCharge',
    battery : 3,
    hp : 200,
    power : 200,
    defense : 200,
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
    value : 0.50,
    hp : 500,
    power : 100,
    defense : 100,
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
    value : 200,
    hp : 0,
    power : 400,
    defense : 0,
    speed : 30
});

db.pilots.insert({
    id : 'akira',
    name: '晶',
    pict: 'akira.png',
    pictTopMargin : 32,
    pictLeftMargin : 64,
    shout: '僕の勝ちだね',
    type: 'superGuard',
    value : 0.5,
    hp : 300,
    power : 300,
    defense : 300,
    speed : 25
});