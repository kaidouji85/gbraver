var bgmManager = require('../bgm/bgmManager');
var __ = require('underscore');

module.exports = function(spec){
    var core = new Core(320, 480);
    var contentBaseUrl = spec && spec.contentBaseUrl || location.origin;

    core.PICT_PREFIX = '/images/';
    var pictResource = {
        PICT_GRAN_BRAVER: core.PICT_PREFIX+'GranBraver.PNG',
        PICT_WAKE_UP_GRANBRAVER: core.PICT_PREFIX+'wakeUpGranBraver.PNG',
        PICT_LANDOZER: core.PICT_PREFIX+'Landozer.PNG',
        PICT_WAKE_UP_LANDOZER: core.PICT_PREFIX+'wakeUpLandozer.PNG',
        PICT_GUARDIAS: core.PICT_PREFIX+'Guardias.png',
        PICT_GUARDIAS_BREAK: core.PICT_PREFIX+'GuardiasBreak.png',
        PICT_WAKE_UP_GUARDIAS: core.PICT_PREFIX+'wakeUpGuardias.png',

        PICT_ZERO_BRAVER: core.PICT_PREFIX+'ZeroBraver.PNG',
        PICT_WAKE_UP_ZERO_BRAVER: core.PICT_PREFIX+'wakeUpZeroBraver.PNG',
        PICT_KYOKO: core.PICT_PREFIX+'kyoko.png',
        PICT_AKANE: core.PICT_PREFIX+'akane.png',
        PICT_IORI: core.PICT_PREFIX+'iori.png',
        PICT_AKIRA: core.PICT_PREFIX+'akira.png',
        PICT_UKETUKE: core.PICT_PREFIX+'uketuke.png',
        PICT_UNTENSYU: core.PICT_PREFIX+'untensyu.png',

        PICT_ACTIVE_BAR: core.PICT_PREFIX+'activeBar.png',
        PICT_ACTIVE_BAR_BACK: core.PICT_PREFIX+'activeBack.png',
        PICT_BATTERY_GAUGE: core.PICT_PREFIX+'batteryGauge.png',
        PICT_BATTERY_BACK: core.PICT_PREFIX+'batteryBack.png',
        PICT_BATTERY_NUMBER: core.PICT_PREFIX+'batteryNumber.png',
        PICT_HIT_EFFECT: core.PICT_PREFIX+'hitEffect.png',
        PICT_DAMAGE: core.PICT_PREFIX+'damage.png',
        PICT_HIT_TEXT: core.PICT_PREFIX+'hitText.png',
        PICT_BG_GROUND: core.PICT_PREFIX+'bgGround.png',
        PICT_BG_GROUND2: core.PICT_PREFIX+'bgGround2.png',
        PICT_WINDOW: core.PICT_PREFIX+'window.png',
        PICT_ACTIVE_WINDOW: core.PICT_PREFIX+'activeWindow.png',
        PICT_BLACK_WINDOW: core.PICT_PREFIX+'blackWindow.png',
        PICT_COMMAND_WINDOW: core.PICT_PREFIX+'commandWindow.png',
        PICT_WIN: core.PICT_PREFIX+'win.png',
        PICT_LOSE: core.PICT_PREFIX+'lose.png',
        PICT_BUTTON: core.PICT_PREFIX+'button.png',
        PICT_EXPLOSION: core.PICT_PREFIX+'explosion.png',
        PICT_OVERHEAT_BUTTON: core.PICT_PREFIX+'overHeatButton.png',
        PICT_WAKEUP_BACK: core.PICT_PREFIX+'wakeUpBack.png',
        PICT_EXECUTE_ABILITY_TELOP: core.PICT_PREFIX+'executeAbility.png',
        PICT_EXECUTE_SKILL_TELOP: core.PICT_PREFIX+'executePilotSkill.png',
        PICT_MINI_NUMBER: core.PICT_PREFIX+'miniNumber.png',
        PICT_SPECIAL_BAR: core.PICT_PREFIX+'specialBar.png',
        PICT_SPECIAL_BAR_BACK: core.PICT_PREFIX+'specialBarBack.png',
        PICT_BASIC_MERTER_BASE: core.PICT_PREFIX+'basicMerterBase.png',
        PICT_HP_MERTER_UP: core.PICT_PREFIX+'hpMerterUp.png',
        PICT_HP_MERTER_DOWN: core.PICT_PREFIX+'hpMerterDown.png',
        PICT_BASIC_MERTER_NUMBER_BACK: core.PICT_PREFIX+'basicMerterNumberBack.png',
        PICT_ACTIVE_MERTER_UP: core.PICT_PREFIX+'activeMerterUp.png',
        PICT_ACTIVE_MERTER_DOWN: core.PICT_PREFIX+'activeMerterDown.png',
        PICT_BATTERY_MERTER_UP: core.PICT_PREFIX+'batteryMerterUp.png',
        PICT_BATTERY_MERTER_DOWN: core.PICT_PREFIX+'batteryMerterDown.png',
        PICT_SPECIAL_MERTER_UP: core.PICT_PREFIX+'specialMerterUp.png',
        PICT_SPECIAL_MERTER_DOWN: core.PICT_PREFIX+'specialMerterDown.png',
        PICT_TOURNAMENT_BLOCK_1: core.PICT_PREFIX+'tournamentBlock1.png',
        PICT_TOURNAMENT_BLOCK_2: core.PICT_PREFIX+'tournamentBlock2.png',
        PICT_TOURNAMENT_BLOCK_3: core.PICT_PREFIX+'tournamentBlock3.png'
    };

    core.SOUND_PREFIX = contentBaseUrl+'/sound/';
    var soundResource = {
        SOUND_BATTLE : core.SOUND_PREFIX + 'game_maoudamashii_1_battle34.mp3',
        SOUND_ATTACK_HIT : core.SOUND_PREFIX + 'mecha27.wav',
        SOUND_ATTACK_MISS : core.SOUND_PREFIX + 'swing32.wav',
        SOUND_MY_TURN : core.SOUND_PREFIX + 'cursor02.wav',
        SOUND_EXPLOSION : core.SOUND_PREFIX + 'tm2r_bom27_a.wav',
        SOUND_PUSH_BUTTON : core.SOUND_PREFIX + 'tm2_switch001.wav',
        SOUND_OPEN_BATTERY : core.SOUND_PREFIX + 'power21.wav',
        SOUND_WAKE_UP : core.SOUND_PREFIX + 'mecha20.wav'
    };

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

    __.each(pictResource, function(item) {
        core.preload(item);
    });
    __.each(soundResource, function(item) {
        core.preload(item);
    });

    return __.extend(core, pictResource, soundResource);
}