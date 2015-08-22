function gameBase(spec,my){
    var core = new Core(320, 480);
    var contentBaseUrl = spec&&spec.contentBaseUrl || location.origin;
    core.PICT_PREFIX = contentBaseUrl + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
    core.PICT_HIT_EFFECT = core.PICT_PREFIX+'hitEffect.png';
    core.PICT_DAMAGE = core.PICT_PREFIX+'damage.png';
    core.PICT_HIT_TEXT = core.PICT_PREFIX+'hitText.png';
    core.PICT_BG_GROUND = core.PICT_PREFIX+'bgGround.png';
    core.PICT_BG_GROUND2 = core.PICT_PREFIX+'bgGround2.png';
    core.PICT_WINDOW = core.PICT_PREFIX+'window.png';
    core.PICT_ACTIVE_WINDOW = core.PICT_PREFIX+'activeWindow.png';
    core.PICT_BLACK_WINDOW = core.PICT_PREFIX+'blackWindow.png';
    core.PICT_COMMAND_WINDOW = core.PICT_PREFIX+'commandWindow.png';
    core.PICT_WIN = core.PICT_PREFIX+'win.png';
    core.PICT_LOSE = core.PICT_PREFIX+'lose.png';
    core.PICT_BUTTON = core.PICT_PREFIX+'button.png';
    core.PICT_EXPLOSION = core.PICT_PREFIX+'explosion.png';
    core.PICT_OVERHEAT_BUTTON = core.PICT_PREFIX+'overHeatButton.png';
    core.PICT_WAKEUP_BACK = core.PICT_PREFIX+'wakeUpBack.png';
    core.PICT_EXECUTE_ABILITY_TELOP = core.PICT_PREFIX+'executeAbility.png';
    core.PICT_EXECUTE_SKILL_TELOP = core.PICT_PREFIX+'executePilotSkill.png';
    core.PICT_MINI_NUMBER = core.PICT_PREFIX+'miniNumber.png';
    core.PICT_SPECIAL_BAR = core.PICT_PREFIX+'specialBar.png';
    core.PICT_SPECIAL_BAR_BACK = core.PICT_PREFIX+'specialBarBack.png';
    core.PICT_BASIC_MERTER_BASE = core.PICT_PREFIX+'basicMerterBase.png';
    core.PICT_HP_MERTER_UP = core.PICT_PREFIX+'hpMerterUp.png';
    core.PICT_HP_MERTER_DOWN = core.PICT_PREFIX+'hpMerterDown.png';
    core.PICT_BASIC_MERTER_NUMBER_BACK = core.PICT_PREFIX+'basicMerterNumberBack.png';
    core.PICT_ACTIVE_MERTER_UP = core.PICT_PREFIX+'activeMerterUp.png';
    core.PICT_ACTIVE_MERTER_DOWN = core.PICT_PREFIX+'activeMerterDown.png';
    core.PICT_BATTERY_MERTER_UP = core.PICT_PREFIX+'batteryMerterUp.png';
    core.PICT_BATTERY_MERTER_DOWN = core.PICT_PREFIX+'batteryMerterDown.png';
    core.PICT_SPECIAL_MERTER_UP = core.PICT_PREFIX+'specialMerterUp.png';
    core.PICT_SPECIAL_MERTER_DOWN = core.PICT_PREFIX+'specialMerterDown.png';

    core.SOUND_PREFIX = contentBaseUrl+'/sound/';
    core.SOUND_BATTLE = core.SOUND_PREFIX + 'game_maoudamashii_1_battle34.mp3';
    core.SOUND_ATTACK_HIT = core.SOUND_PREFIX + 'mecha27.wav';
    core.SOUND_ATTACK_MISS = core.SOUND_PREFIX + 'swing32.wav';
    core.SOUND_MY_TURN = core.SOUND_PREFIX + 'cursor02.wav';
    core.SOUND_EXPLOSION = core.SOUND_PREFIX + 'tm2r_bom27_a.wav';
    core.SOUND_PUSH_BUTTON = core.SOUND_PREFIX + 'tm2_switch001.wav';
    core.SOUND_OPEN_BATTERY = core.SOUND_PREFIX + 'power21.wav';
    core.SOUND_WAKE_UP = core.SOUND_PREFIX + 'mecha20.wav';
    core.WAIT_TIME_ACTIVE_RESET = 30;
    core.ICON_WIDTH = 124;
    core.ICON_HEIGHT = 40;
    core.COMMAND_POS_Y = 300;
    core.FRAME_STAND = 0;
    core.FRAME_ATTACK = 1;
    core.FRAME_DAMAGE = 2;
    core.ATACK_HIT = 1;
    core.ATACK_MISS = 2;
    core.ATACK_GUARD = 3;
    core.ATACK_CRITICAL = 4;
    core.SYSTEM_BG_WIDTH = 320;
    core.SYSTEM_BG_HEIGHT = 480;
    core.BUTTON_WIDTH = 96;
    core.BUTTON_HEIGHT = 24;
    core.COMMAND_TIME_OVER = 30;
    core.MESSAGE_WAIT_COMMUNICATE = '通信待機中';
    core.MESSAGE_WAIT_ENTERROOM = 'プレイヤーの入室待ち';
    core.MESSAGE_WAIT_COMMAND = '対戦相手がコマンドを選択中......';
    core.MESSAGE_GET_ROOMINFO = 'ルーム情報取得中';
    core.MESSAGE_LOGOFF = 'ログオフ中';
    core.MESSAGE_BATTLE_END = 'ボタンを押して下さい';
    core.MESSAGE_WINDOW_Y = 276;
    core.BATTLE_MODE_TWO_PLAY = 'twoPlay';
    core.BATTLE_MODE_SINGLE_PLAY = 'singlePlay';
    core.BATTLE_MODE_STORY = 'story';

    core.fps = 40;
    core.bgm = bgmManager();
    preLoad();

    function preLoad() {
        core.preload(core.PICT_PREFIX+'GranBraver.PNG');
        core.preload(core.PICT_PREFIX+'wakeUpGranBraver.PNG');
        core.preload(core.PICT_PREFIX+'Landozer.PNG');
        core.preload(core.PICT_PREFIX+'Guardias.png');
        core.preload(core.PICT_PREFIX+'GuardiasBreak.png');
        core.preload(core.PICT_PREFIX+'wakeUpGuardias.png');
        core.preload(core.PICT_PREFIX+'wakeUpLandozer.PNG');
        core.preload(core.PICT_PREFIX+'ZeroBraver.PNG');
        core.preload(core.PICT_PREFIX+'wakeUpZeroBraver.PNG');
        core.preload(core.PICT_PREFIX+'kyoko.png');
        core.preload(core.PICT_PREFIX+'akane.png');
        core.preload(core.PICT_PREFIX+'iori.png');
        core.preload(core.PICT_PREFIX+'akira.png');
        core.preload(core.PICT_ACTIVE_BAR);
        core.preload(core.PICT_ACTIVE_BAR_BACK);
        core.preload(core.PICT_BATTERY_GAUGE);
        core.preload(core.PICT_BATTERY_BACK);
        core.preload(core.PICT_BATTERY_NUMBER);
        core.preload(core.PICT_HIT_EFFECT);
        core.preload(core.PICT_DAMAGE);
        core.preload(core.PICT_HIT_TEXT);
        core.preload(core.PICT_BG_GROUND);
        core.preload(core.PICT_BG_GROUND2);
        core.preload(core.PICT_WINDOW);
        core.preload(core.PICT_ACTIVE_WINDOW);
        core.preload(core.PICT_BLACK_WINDOW);
        core.preload(core.PICT_COMMAND_WINDOW);
        core.preload(core.PICT_WIN);
        core.preload(core.PICT_LOSE);
        core.preload(core.PICT_BUTTON);
        core.preload(core.PICT_EXPLOSION);
        core.preload(core.PICT_OVERHEAT_BUTTON);
        core.preload(core.PICT_WAKEUP_BACK);
        core.preload(core.PICT_EXECUTE_ABILITY_TELOP);
        core.preload(core.PICT_EXECUTE_SKILL_TELOP);
        core.preload(core.PICT_MINI_NUMBER);
        core.preload(core.PICT_SPECIAL_BAR);
        core.preload(core.PICT_SPECIAL_BAR_BACK);
        core.preload(core.PICT_BASIC_MERTER_BASE);
        core.preload(core.PICT_HP_MERTER_UP);
        core.preload(core.PICT_HP_MERTER_DOWN);
        core.preload(core.PICT_BASIC_MERTER_NUMBER_BACK);
        core.preload(core.PICT_ACTIVE_MERTER_UP);
        core.preload(core.PICT_ACTIVE_MERTER_DOWN);
        core.preload(core.PICT_BATTERY_MERTER_UP);
        core.preload(core.PICT_BATTERY_MERTER_DOWN);
        core.preload(core.PICT_SPECIAL_MERTER_UP);
        core.preload(core.PICT_SPECIAL_MERTER_DOWN);

        core.preload(core.SOUND_BATTLE);
        core.preload(core.SOUND_ATTACK_HIT);
        core.preload(core.SOUND_ATTACK_MISS);
        core.preload(core.SOUND_MY_TURN);
        core.preload(core.SOUND_EXPLOSION);
        core.preload(core.SOUND_PUSH_BUTTON);
        core.preload(core.SOUND_OPEN_BATTERY);
        core.preload(core.SOUND_WAKE_UP);
    }
    return core;
}