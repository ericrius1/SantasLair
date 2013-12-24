(function() {
  var Stars;

  FW.Stars = Stars = (function() {
    var rnd;

    rnd = FW.rnd;

    function Stars() {
      this.starGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        blending: THREE.AdditiveBlending,
        maxAge: 40
      });
      this.generateStars(new THREE.Color(0xff4d4d));
      this.generateStars(new THREE.Color(0x3224e7));
      FW.scene.add(this.starGroup.mesh);
    }

    Stars.prototype.generateStars = function(color) {
      var starEmitter;
      starEmitter = new ShaderParticleEmitter({
        type: 'sphere',
        position: new THREE.Vector3(0, 3000, 0),
        radius: FW.width * 0.65,
        colorStart: color,
        colorEnd: color,
        size: 1000,
        sizeSpread: 1000,
        particlesPerSecond: 500,
        opacityStart: 0,
        opacityMiddle: 1,
        opacityEnd: 0
      });
      return this.starGroup.addEmitter(starEmitter);
    };

    Stars.prototype.tick = function() {
      return this.starGroup.tick(0.16);
    };

    return Stars;

  })();

}).call(this);
