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
      this.colorEnd = new THREE.Color();
      this.colorEnd.setRGB(Math.random(), Math.random(), Math.random());
      height = rnd(30, 60);
      for (y = _i = 1; 1 <= height ? _i <= height : _i >= height; y = 1 <= height ? ++_i : --_i) {
        this.treeGroup.addEmitter(this.generateNode(y));
      }
      FW.scene.add(this.treeGroup.mesh);
    }

    Tree.prototype.generateNode = function(y) {
      var cityEmitter, colorEnd, colorStart, spread;
      colorStart = new THREE.Color();
      colorStart.setRGB(.2, y / 50, .2);
      colorEnd = new THREE.Color();
      colorEnd.setRGB(.3, y / 50, .3);
      spread = 250 - y * 5;
      return cityEmitter = new ShaderParticleEmitter({
        size: 50,
        sizeSpread: 20,
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 0, spread * rnd(0.9, 1)),
        colorStart: colorStart,
        colorSpread: new THREE.Vector3(1, 1, 1),
        colorEnd: colorEnd,
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
