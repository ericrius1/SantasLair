(function() {
  var Laser;

  FW.Laser = Laser = (function() {
    var rnd;

    rnd = FW.rnd;

    function Laser(pos) {
      this.position = pos;
      this.laserGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 100
      });
      this.laserGroup.addPool(1, this.generateLaser(), false);
      FW.scene.add(this.laserGroup.mesh);
    }

    Laser.prototype.generateLaser = function() {
      var colorStart, laserEmitterSettings;
      colorStart = new THREE.Color();
      colorStart.setRGB(1, .5, 1);
      return laserEmitterSettings = {
        size: 200,
        acceleration: new THREE.Vector3(0, -.1, 0),
        colorStart: colorStart,
        particlesPerSecond: 10,
        alive: 0
      };
    };

    Laser.prototype.activate = function() {
      return this.laserGroup.triggerPoolEmitter(0, new THREE.Vector3(10, 100, 0));
    };

    Laser.prototype.tick = function() {
      return this.laserGroup.tick(FW.globalTick);
    };

    return Laser;

  })();

}).call(this);
