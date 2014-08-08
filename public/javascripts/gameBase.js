function gameBase(spec,my){
    var core = new Core(320, 480);

    core.PICT_PREFIX = location.origin + '/images/';
    core.PICT_ACTIVE_BAR = core.PICT_PREFIX+'activeBar.png';
    core.PICT_ACTIVE_BAR_BACK = core.PICT_PREFIX+'activeBack.png';
    core.PICT_BATTERY_GAUGE = core.PICT_PREFIX+'batteryGauge.png';
    core.PICT_BATTERY_BACK = core.PICT_PREFIX+'batteryBack.png';
    core.PICT_BATTERY_NUMBER = core.PICT_PREFIX+'batteryNumber.png';
    core.PICT_ATTTACK_PARTICLE = core.PICT_PREFIX+'attackParticle.png';
    core.PICT_HIT_EFFECT = core.PICT_PREFIX+'hitEffect.png';
    core.PICT_DAMAGE = core.PICT_PREFIX+'damage.png';
    core.WAIT_TIME_ACTIVE_RESET = 30;
    core.ICON_WIDTH = 124;
    core.ICON_HEIGHT = 40;
    core.COMMAND_POX_X = 8;
    core.COMMAND_POS_Y = 300;
    core.FRAME_STAND = 0;
    core.FRAME_ATTACK = 1;
    core.FRAME_DAMAGE = 2;
    core.ATACK_HIT = 1;
    core.ATACK_MISS = 2;
    core.ATACK_GUARD = 3;
    core.ATACK_CRITICAL = 4;

    core.fps = 60;
    core.battleScene = null;
    core.roomSelectScene = null;
    core.setArmdozerScene = null;
    preLoad();

    function preLoad() {
        //戦闘画面
        core.preload(core.PICT_PREFIX+'GranBraver.PNG');
        core.preload(core.PICT_PREFIX+'Landozer.PNG');
        core.preload(core.PICT_PREFIX+'ZeroBraver.PNG');
        core.preload(core.PICT_ACTIVE_BAR);
        core.preload(core.PICT_ACTIVE_BAR_BACK);
        core.preload(core.PICT_BATTERY_GAUGE);
        core.preload(core.PICT_BATTERY_BACK);
        core.preload(core.PICT_BATTERY_NUMBER);
        core.preload(core.PICT_ATTTACK_PARTICLE);
        core.preload(core.PICT_HIT_EFFECT);
        core.preload(core.PICT_DAMAGE);
    }
    return core;
}