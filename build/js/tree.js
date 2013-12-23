(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var height, y, _i;
      this.position = pos;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 100
      });
      height = rnd(30, 60);
      for (y = _i = 1; _i <= 50; y = ++_i) {
        this.treeGroup.addEmitter(this.generateNode(y));
      }
      FW.scene.add(this.treeGroup.mesh);
    }

    Tree.prototype.generateNode = function(y) {
      var cityEmitter, colorEnd, colorStart, spread;
      colorStart = new THREE.Color();
      colorStart.setRGB(.067, 0.17, .035);
      colorEnd = new THREE.Color();
      colorEnd.setRGB(.067, 0.17, .078);
      spread = 250 - y * 5;
      return cityEmitter = new ShaderParticleEmitter({
        size: 50,
        sizeSpread: 50,
        position: new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 0, spread * rnd(0.9, 1)),
        colorStart: colorStart,
        colorEnd: colorStart,
        particlesPerSecond: 10 / y,
        opacityEnd: 1
      });
    };

    Tree.prototype.tick = function() {
      return this.treeGroup.tick(FW.globalTick);
    };

    return Tree;

  })();

}).call(this);
