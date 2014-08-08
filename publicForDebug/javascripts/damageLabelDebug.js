enchant();
window.onload = function() {
    var core = new gameBase();
    core.currentScene.backgroundColor = 'black';
    core.start();
    core.onload = function(){
        var dl1 = damageLabel({
            pict : core.assets[core.PICT_DAMAGE]
        });
        dl1.x = 100;
        dl1.y = 100;
        dl1.setDamage(1234);
        core.currentScene.addChild(dl1);

        var dl2 = damageLabel({
            pict : core.assets[core.PICT_DAMAGE]
        });
        dl2.x = 100;
        dl2.y = 135;
        dl2.setDamage(567);
        core.currentScene.addChild(dl2);

        var dl3 = damageLabel({
            pict : core.assets[core.PICT_DAMAGE]
        });
        dl3.x = 100;
        dl3.y = 170;
        dl3.setDamage(89);
        core.currentScene.addChild(dl3);

        var dl4 = damageLabel({
            pict : core.assets[core.PICT_DAMAGE]
        });
        dl4.x = 100;
        dl4.y = 205;
        dl4.setDamage(1);
        core.currentScene.addChild(dl4);

        var dl5 = damageLabel({
            pict : core.assets[core.PICT_DAMAGE]
        });
        dl5.x = 100;
        dl5.y = 240;
        dl5.setDamage(43213);
        core.currentScene.addChild(dl5);
    }
}