var testData = require('../testlib/testData');
var testUtil = require('../testlib/testUtil');
var game = require('../../../../client/game/game');

enchant();
window.onload = doTest;

function doTest(){
  var assert = chai.assert;
  var testDataInst = testData();
  var Game;
  initGame();

  function initGame(){
    Game = game({
      userId : 'test001@gmail.com',
      armdozerId : 'granBraver',
      pilotId : 'kyoko',
      armdozerList : testDataInst.getMasterData().armdozerList,
      pilotList : testDataInst.getMasterData().pilotList
    });
    Game.start();
    Game.onload = function(){
      Game.changeTopScene();
      testUtil.finishTest();
    };
  }
}