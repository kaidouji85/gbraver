enchant();
var assert;
var gameStartData = {
    'test001@gmail.com' : {
        userId : 'test001@gmail.com',
        status : {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            active : 0,
            battery : 5,
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
                },
            }
        }
    },
    'test002@gmail.com' : {
        userId : 'test002@gmail.com',
        status : {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            speed : 300,
            active : 0,
            battery : 5,
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
        }
    }
};
    
window.onload = function(){
    assert = chai.assert;
    //topToRoomSelect();
    //topToSetArmdozer();
    //setArmdozerToTop();
    roomSelectToBattle();
};

function topToRoomSelect(){
    var Game = game({
        userId : 'test001@gmail.com'        
    });
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('対戦ルーム入室ボタンを押す');
        Game.onChangeScene(function(scene){
            assert.equal(scene,'selectRoom','ルーム選択画面へ遷移する');
            console.log('finish');
            $('title').text('finish');
        });
    };    
}

function topToSetArmdozer(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeTopScene();
        console.log('アームドーザ選択ボタンを押す');
        Game.onChangeScene(function(scene){
            assert.equal(scene,'setArmdozer','ルーム選択画面へ遷移する');
            console.log('finish');
            $('title').text('finish');
        });
    };    
}

function setArmdozerToTop(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeSetArmdozerScene();
        console.log('ランドーザボタンを押す');
        Game.onSendMessage(function(message,data){
            Game.onChangeScene(function(scene){
                assert.equal(scene,'top','トップ画面へ遷移する');
                console.log('finish');
                $('title').text('finish');
            });
            Game.emitServerResp('successSetArmdozer',{});
        });
    };      
}

function roomSelectToBattle(){
    var Game = game({
        userId : 'test001@gmail.com'
    });
    Game.start();
    Game.onload = function(){
        Game.changeRoomSelectScene();
        console.log('ルーム2で入室');
        Game.onSendMessage(function(message,data){
            var expectData = {
                roomId : 2
            };
            assert.equal(message,'enterRoom','メッセージが正しい');
            assert.deepEqual(data,expectData,'入室メッセージのパラメータが正しい');
            
            Game.onChangeScene(function(scene){
                assert.equal(scene,'battle','戦闘画面へ遷移する');
                Game.onSendMessage(function(message,data){
                    var expectData = {
                        method : 'ready'
                    };
                    assert.equal(message,'command','サーバレスポンスメッセージが正しい');
                    assert.deepEqual(data,expectData,'メッセージオプションが正しい');
                    console.log('finish');
                    $('title').text('finish'); 
                });
            });
            Game.emitServerResp('gameStart',gameStartData);
        });
    };
}


