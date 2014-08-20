enchant();
window.onload = roomSelectToBattle;

function roomSelectToBattle(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com'
        });
        Game.start();
        Game.onload = function(){
            Game.changeRoomSelectScene();
            //console.log('ルーム2で入室');
            touch(Game.roomSelectScene.enterRoomButtonArray[2]);
            Game.onSendMessage(assertSendMessage);
        };
    }

    function assertSendMessage(message,data){
        var expectData = {
            roomId : 2
        };
        assert.equal(message,'enterRoom','メッセージが正しい');
        assert.deepEqual(data,expectData,'入室メッセージのパラメータが正しい');
        gameStart();
    }

    function gameStart() {
        //TODO : データ構造が気持ち悪い。ユーザIDが重複しまくってる。サーバ側の修正も必要だから一筋縄ではいかない。
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
        Game.onChangeScene(assertChangeScene);
        Game.emitServerResp('gameStart',gameStartData);
    }

    function assertChangeScene(scene) {
        assert.equal(scene, 'battle', '戦闘画面へ遷移する');
        Game.onSendMessage(assertSendMessage2);
    }

    function assertSendMessage2(message, data){
        var expectData = {
            method : 'ready'
        };
        assert.equal(message, 'command', 'サーバレスポンスメッセージが正しい');
        assert.deepEqual(data, expectData, 'メッセージオプションが正しい');
        finishTest();
    }
}