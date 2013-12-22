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
        maxAge: 10
      });
      for (i = _i = 1; _i <= 50000; i = ++_i) {
        this.swirlGroup.addPool(1, this.generateNode(), false);
      }
      FW.scene.add(this.swirlGroup.mesh);
    }

    Swirl.prototype.generateNode = function() {
      var colorEnd, colorStart, mappedColor, swirlEmitterSettings;
      colorStart = new THREE.Color();
      mappedColor = map(currentPoint, 0, totalPoints, 0, 1);
      colorStart.setHSL(mappedColor, 0.5, 0.5);
      colorEnd = new THREE.Color();
      return swirlEmitterSettings = {
        size: 20,
        colorStart: colorStart,
        particlesPerSecond: 1,
        alive: 0
      };
    };

    Swirl.prototype.tick = function() {
      return this.swirlGroup.tick(FW.globalTick);
    };

    return Swirl;

  })();

}).call(this);
