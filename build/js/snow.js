(function() {
  var Snow;

  FW.Snow = Snow = (function() {
    var rnd;

    rnd = FW.rnd;

    function Snow() {
      var colorStart;
      this.snowGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        maxAge: 70
      });
      this.colorEnd = new THREE.Color();
      colorStart = new THREE.Color();
      colorStart.setRGB(1, 0, 0);
      this.snowGroup.addEmitter(this.generateSnow(colorStart));
      colorStart.setRGB(0, 1, 0);
      this.snowGroup.addEmitter(this.generateSnow(colorStart));
      FW.scene.add(this.snowGroup.mesh);
      this.snowGroup.mesh.renderDepth = -2;
    }

    Snow.prototype.generateSnow = function(colorStart) {
      var snowEmitterSettings;
      return snowEmitterSettings = new ShaderParticleEmitter({
        size: 800,
        sizeEnd: 300,
        position: new THREE.Vector3(0, FW.width * 0.7, 0),
        positionSpread: new THREE.Vector3(200, 2000, 200),
        colorStart: colorStart,
        colorEnd: this.colorEnd,
        velocity: new THREE.Vector3(0, -100, 0),
        velocitySpread: new THREE.Vector3(100, 0, 100),
        acceleration: new THREE.Vector3(0, -0.00, 0),
        accelerationSpread: new THREE.Vector3(2, 0, 2),
        particlesPerSecond: 30,
        opacityEnd: 0.6
      });
    };

    Snow.prototype.tick = function() {
      return this.snowGroup.tick(FW.globalTick);
    };

    return Snow;

  })();

}).call(this);
