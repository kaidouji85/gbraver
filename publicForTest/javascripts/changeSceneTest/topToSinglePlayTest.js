enchant();
window.onload = topToSetArmdozer;

function topToSetArmdozer(){
    var assert = chai.assert;
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeTopScene();
            pushSinglePlayButton();
        };
    }

    function pushSinglePlayButton(){
        //console.log('アームドーザ選択ボタンを押す');
        touch(Game.currentScene.singlePlayButton);
        Game.onSendMessage(asertOfMessage);
    }

    function asertOfMessage(message,data) {
        var expectData = {
            enemyId : 'landozer'
        };
        assert.equal(message, 'startSinglePlay', 'サーバ送信メッセージが正しい');
        assert.deepEqual(data, expectData, 'サーバ送信データが正しい');
        assert.equal(Game.currentScene.battleRoomButton.getVisible(),false,'対戦ルーム入室ボタンが表示されない');
        assert.equal(Game.currentScene.setArmdpzerButton.getVisible(),false,'アームドーザ選択ボタンが表示されない');
        assert.equal(Game.currentScene.singlePlayButton.getVisible(),false,'シングルプレイボタンが表示されない');
        assert.equal(Game.currentScene.title.getVisible(),true,'画面タイトルが表示される。');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージウインドウのメッセージが正しい');
        Game.currentScene.tl.delay(60).then(function(){
            doServerResp();
        });
    }

    function doServerResp(){
        var serverResp = {
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
                        }
                    }
                }
            },
            'nonePlayerCharacter' : {
                userId : 'nonePlayerCharacter',
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
        Game.onChangeScene(assertOfChangeScene);
        Game.emitServerResp('gameStart',serverResp);
    }

    function assertOfChangeScene(scene){
        assert.equal(scene,'battle','戦闘画面へ遷移する');
        Game.onSendMessage(finishTest);
    }
}