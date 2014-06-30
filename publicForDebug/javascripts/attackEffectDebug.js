var core;
var PICT_PREFIX = location.origin + '/images/';
var PICT_ATTACK_PARTICLE = PICT_PREFIX + 'attackPArticle.png';

enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_ATTACK_PARTICLE);
    core.start();
    core.onload = function(){
        var AttackEffect = attackEffect({
            attackParticleImage : core.assets[PICT_ATTACK_PARTICLE]
        });
        AttackEffect.x = 64;
        AttackEffect.y = 64;
        AttackEffect.play();
        core.rootScene.addChild(AttackEffect);
    };
};
