enchant();
var gbraverDebug = {};
var assert;

window.onload = function(){
    assert = chai.assert;
    //selectSetArmdozer();
    selectBattleRoom();
};


function selectSetArmdozer(){
    var Game = game();
    var TopScene;
    
    Game.start();
    Game.onload = function(){
        changeTopScnene();
    };
    
    function changeTopScnene(){
        TopScene = topScene();
        Game.replaceScene(TopScene);
        selectSetArmdozerButton();
    }
    
    function selectSetArmdozerButton(){
        TopScene.onPushSetArmdozer(function(){
            console.log('finish');
            $('title').text('finish');
        });
        console.log('アームドーザ選択ボタンを押下する');
    }
}

function selectBattleRoom(){
    var Game = game();
    var TopScene;
    
    Game.start();
    Game.onload = function(){
        changeTopScnene();
    };
    
    function changeTopScnene(){
        TopScene = topScene();
        Game.replaceScene(TopScene);
        selectSetArmdozerButton();
    }
    
    function selectSetArmdozerButton(){
        TopScene.onPushBattleRoom(function(){
            console.log('finish');
            $('title').text('finish');
        });
        console.log('対戦ルーム入室ボタンを押下する');
    }    
}
