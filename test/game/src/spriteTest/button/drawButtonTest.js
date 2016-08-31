import testUtil from 'game-test/testlib/testUtil.js';
import button from 'client/sprite/button';
import gameBase from 'client/game/gameBase';

enchant();
window.onload = ()=>{
  let TestGame = gameBase();

  TestGame.start();
  TestGame.onload = ()=>{
    let testButton = button({
      image: TestGame.assets[TestGame.PICT_LOGOUT_BUTTON]
    });
    TestGame.currentScene.addChild(testButton);
    testUtil.finishTest();
  };
}