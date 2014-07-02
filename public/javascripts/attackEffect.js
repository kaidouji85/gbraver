function attackEffect(spec,my){
    var that = new Group();
    var attackParticleImage = spec.attackParticleImage;
    var particle;
    var PARTICLE_NUM = 40;

    that.play = play;
    initParticle();

    function initParticle(){
        particle = new Array(PARTICLE_NUM);
        for(var i=1; i<=PARTICLE_NUM; i++) {
            particle[i] = attackEffectPArticle({
                attackParticleImage : attackParticleImage
            });
            that.addChild(particle[i]);
        }
    }

    function play(){
        for(var i=1; i<=PARTICLE_NUM; i++){
            var deg = Math.random()*360;
            particle[i].x = 0;
            particle[i].y = 0;
            particle[i].play(deg);
        }

    }

    return that;
}

function attackEffectPArticle(spec, my){
    var that = new Sprite(32, 3);
    var attackParticleImage = spec.attackParticleImage;
    that.image = attackParticleImage;
    that.play = play;
    that.visible = false;
    that.originX = 0;
    that.originY = 0;

    function play(deg){
        var rad = deg*(Math.PI/180);
        var speed = 100 + Math.random()*10;
        var dx = speed * Math.cos(rad);
        var dy = speed * Math.sin(rad);
        var time = 20;
        that.opacity = 0.8
        that.visible = true;
        that.rotation = deg;
        that.tl.moveBy(dx,dy,time)
            .and().fadeTo(0,time);
    }

    return that;
}