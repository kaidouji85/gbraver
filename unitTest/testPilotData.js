var ce = require('cloneextend');
var pilotList = {};

pilotList['kyoko'] = {
    name : '恭子',
    pict : 'kyoko.png',
    shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
    type : 'quickCharge',
    battery : 3
};

pilotList['akane'] = {
    name: '茜',
    pict: 'akane.png',
    shout: 'まだまだ、勝負はこれからよ。',
    type: 'quickCharge',
    battery: 3
};

pilotList['iori'] = {
    name : '伊織',
    pict : 'iori.png',
    shout : 'この一撃に、全てを掛ける！！',
    type : 'quickCharge',
    battery : 3
};

function getPilotList(fn) {
    var ret = ce.clone(pilotList);
    fn(null,ret);
}

module.exports.getPilotList = getPilotList;