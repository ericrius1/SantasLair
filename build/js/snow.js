(function() {
  var Snow;

  FW.Snow = Snow = (function() {
    var rnd;

    rnd = FW.rnd;

    function Snow() {
      this.snowGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        maxAge: 80
      });
      this.snowGroup.addEmitter(this.generateSnow());
      FW.scene.add(this.snowGroup.mesh);
      this.snowGroup.mesh.renderDepth = -2;
    }

    Snow.prototype.generateSnow = function() {
      var colorStart, snowEmitterSettings;
      colorStart = new THREE.Color();
      colorStart.setRGB(1, .5, 1);
      return snowEmitterSettings = new ShaderParticleEmitter({
        size: 500,
        sizeEnd: 500,
        position: new THREE.Vector3(0, 10000, 0),
        positionSpread: new THREE.Vector3(FW.height, 0, FW.width),
        colorStart: colorStart,
        velocity: new THREE.Vector3(0, -100, 0),
        acceleration: new THREE.Vector3(0, -1, 0),
        accelerationSpread: new THREE.Vector3(2, .1, 2),
        particlesPerSecond: 100,
        opacityEnd: 1
      });
    };

    Snow.prototype.tick = function() {
      return this.snowGroup.tick(FW.globalTick);
    };

    return Snow;

  })();

}).call(this);
