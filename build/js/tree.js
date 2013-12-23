(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var position, y, _i, _ref;
      this.position = pos;
      this.treeTick = 0.16;
      this.numLayers = 100;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/leaf.png'),
        maxAge: 100,
        blending: THREE.NormalBlending
      });
      this.ornamentGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 10,
        blending: THREE.NormalBlending
      });
      for (y = _i = 1, _ref = this.numLayers; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
        position = new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z);
        this.treeGroup.addEmitter(this.generateTree(y, position));
      }
      FW.scene.add(this.treeGroup.mesh);
    }

    Tree.prototype.generateTree = function(y) {
      var spread, treeEmitter;
      spread = Math.max(0, 250 - y * 2.5);
      return treeEmitter = new ShaderParticleEmitter({
        size: 200,
        sizeSpread: 50,
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 0, spread * rnd(0.9, 1)),
        particlesPerSecond: 20 / y,
        opacityStart: 1.0,
        opacityMiddle: 1.0,
        opacityEnd: 1.0
      });
    };

    Tree.prototype.generateOrnaments = function(y) {
      var ornamentEmmiter, spread;
      spread = 250 - y * 5;
      return ornamentEmmiter = new ShaderParticleEmitter({
        size: 100,
        sizeSpread: 50
      });
    };

    Tree.prototype.tick = function() {
      this.treeGroup.tick(this.treeTick);
      if (this.treeTick > 0.0) {
        return this.treeTick -= .0001;
      }
    };

    return Tree;

  })();

}).call(this);
