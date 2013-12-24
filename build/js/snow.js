(function() {
  var Snow;

  FW.Snow = Snow = (function() {
    var rnd;

    rnd = FW.rnd;

    function Snow() {
      this.snowGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 100
      });
      this.snowGroup.addEmitter(this.generateSnow());
      FW.scene.add(this.snowGroup.mesh);
    }

    Snow.prototype.generateSnow = function() {
      var colorStart, snowEmitterSettings;
      colorStart = new THREE.Color();
      colorStart.setRGB(1, .5, 1);
      return snowEmitterSettings = new ShaderParticleEmitter({
        size: 1000,
        position: new THREE.Vector3(),
        positionSpread: new THREE.Vector3(100, 0, 100),
        colorStart: colorStart,
        velocity: new THREE.Vector3(0, 5, 0),
        acceleration: new THREE.Vector3(0, 4.8, 0),
        accelerationSpread: new THREE.Vector3(0, .03, 0),
        particlesPerSecond: 1
      });
    };

    Snow.prototype.tick = function() {
      return this.snowGroup.tick(FW.globalTick);
    };

    return Snow;

  })();

}).call(this);
