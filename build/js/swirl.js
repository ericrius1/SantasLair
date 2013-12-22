(function() {
  var Swirl;

  FW.Swirl = Swirl = (function() {
    var rnd;

    rnd = FW.rnd;

    function Swirl(pos) {
      var i, _i;
      this.position = pos;
      this.swirlGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 2
      });
      for (i = _i = 1; _i <= 50000; i = ++_i) {
        this.swirlGroup.addPool(1, this.generateNode(), false);
      }
      FW.scene.add(this.swirlGroup.mesh);
    }

    Swirl.prototype.generateNode = function() {
      var colorEnd, colorStart, swirlEmitterSettings;
      colorStart = new THREE.Color();
      colorStart.setRGB(.2, .2, .2);
      colorEnd = new THREE.Color();
      return swirlEmitterSettings = {
        size: 20,
        particlesPerSecond: 1,
        alive: 0,
        emitterDuration: 1
      };
    };

    Swirl.prototype.tick = function() {
      return this.swirlGroup.tick(FW.globalTick);
    };

    return Swirl;

  })();

}).call(this);
