(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var height, y, _i;
      this.position = pos;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/leaf.png'),
        maxAge: 100,
        blending: THREE.NormalBlending
      });
      height = rnd(30, 60);
      for (y = _i = 1; _i <= 50; y = ++_i) {
        this.treeGroup.addEmitter(this.generateNode(y));
      }
      FW.scene.add(this.treeGroup.mesh);
    }

    Tree.prototype.generateNode = function(y) {
      var cityEmitter, colorStart, spread;
      colorStart = new THREE.Color();
      spread = 250 - y * 5;
      return cityEmitter = new ShaderParticleEmitter({
        size: 200,
        sizeSpread: 50,
        position: new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 0, spread * rnd(0.9, 1)),
        colorStart: colorStart,
        colorEnd: colorStart,
        particlesPerSecond: 10 / y,
        opacityStart: 1.0,
        opacityMiddle: 1.0,
        opacityEnd: 1.0
      });
    };

    Tree.prototype.tick = function() {
      return this.treeGroup.tick(FW.globalTick);
    };

    return Tree;

  })();

}).call(this);
