import {createRect} from 'client/util/surfUtil';

/**
 * 画像からボタンを生成する
 *
 * @param {object} spec パラメータ
 * @param {object} spec.image 画像データ
 * @return {object} 画像ボタンのスプライト
 */
export default function button(spec) {
  const core = enchant.Core.instance;
  const image = spec.image || {};
  const width = image.width || 16;
  const height = image.height || 16;

  // ボタンの元画像
  const buttonSprite = new Sprite(width, height);
  buttonSprite.image = image;

  // ボタン押下時の影
  const buttonShadow = new Sprite(width, height);
  buttonShadow.image = createRect(width, height, 'rgba(32, 32, 32, 1)');
  buttonShadow.opacity = 0;

  // 本関数が返却するグループ
  const that = new Group();
  that.addChild(buttonSprite);
  that.addChild(buttonShadow);

  that.addEventListener(Event.TOUCH_START, ()=>{
    core.assets[core.SOUND_PUSH_BUTTON].play();
    buttonShadow.opacity = 0.5;
  });

  that.addEventListener(Event.TOUCH_END, ()=>{
    buttonShadow.opacity = 0;
  });

  that.setVisible = (visible)=>{
    buttonSprite.visible = visible;
    buttonShadow.visible = visible;
  }

  return that;
}