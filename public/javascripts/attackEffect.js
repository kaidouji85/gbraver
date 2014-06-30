function attackEffect(spec,my){
    var that = new Group();
    var attackParticleImage = spec.attackParticleImage;
    var particle;

    that.play = play;
    initParticle();

    function initParticle(){
        particle = attackEffectPArticle({
            attackParticleImage : attackParticleImage
        });
        that.addChild(particle);
    }

    function play(){
        particle.play();
    }

    return that;
}

function attackEffectPArticle(spec, my){
    var that = new Sprite(16, 16);
    var attackParticleImage = spec.attackParticleImage;
    that.image = attackParticleImage;
    that.play = play;

    function play(){
        var posX = that.x + 50;
        var posY = that.y + 50;
        that.tl.moveTo(posX, posY, 20);
    }

    return that;
}