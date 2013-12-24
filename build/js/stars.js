(function() {
  var Stars;

  FW.Stars = Stars = (function() {
    var rnd;

    rnd = FW.rnd;

    function Stars() {
      this.starGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        blending: THREE.AdditiveBlending,
        maxAge: 100
      });
      this.generateStars();
      FW.scene.add(this.starGroup.mesh);
    }

    Stars.prototype.generateStars = function() {
      var colorStart;
      colorStart = new THREE.Color();
      colorStart.setRGB(.8, .1, .1);
      this.starEmitter = new ShaderParticleEmitter({
        type: 'sphere',
        radius: FW.width,
        colorStart: colorStart,
        colorEnd: colorStart,
        speed: .1,
        size: rnd(2000, 4000),
        sizeSpread: 400,
        particlesPerSecond: 500,
        opacityStart: 0,
        opacityMiddle: 0.5,
        opacityEnd: 0
      });
      return this.starGroup.addEmitter(this.starEmitter);
    };

    Stars.prototype.tick = function() {
      return this.starGroup.tick(0.16);
    };

    return Stars;

  })();

}).call(this);
