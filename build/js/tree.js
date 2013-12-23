(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var position, y, _i, _ref;
      this.position = pos;
      this.treeTick = 2;
      this.ornamentTick = .16;
      this.numLayers = 100;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/leaf2.png'),
        maxAge: 100,
        blending: THREE.NormalBlending
      });
      this.ornamentGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 10,
        blending: THREE.NormalBlending
      });
      this.ornamentGroup2 = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 10,
        blending: THREE.NormalBlending
      });
      for (y = _i = 1, _ref = this.numLayers; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
        position = new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z);
        this.treeGroup.addEmitter(this.generateTree(y, position));
        this.ornamentGroup.addEmitter(this.generateOrnaments(y));
        this.ornamentGroup2.addEmitter(this.generateOrnaments2(y));
      }
      FW.scene.add(this.treeGroup.mesh);
      FW.scene.add(this.ornamentGroup.mesh);
      FW.scene.add(this.ornamentGroup2.mesh);
    }

    Tree.prototype.generateTree = function(y) {
      var spread, treeEmitter;
      spread = Math.max(0, 250 - y * 2.5);
      return treeEmitter = new ShaderParticleEmitter({
        size: 150,
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 10, spread * rnd(0.9, 1)),
        colorEnd: new THREE.Color(),
        particlesPerSecond: 10 / y,
        opacityEnd: 1.0
      });
    };

    Tree.prototype.generateOrnaments = function(y) {
      var colorStart, ornamentEmmiter, spread;
      spread = Math.max(0, 250 - y * 2.5);
      colorStart = new THREE.Color();
      colorStart.setRGB(0x8d1818);
      return ornamentEmmiter = new ShaderParticleEmitter({
        size: 200,
        sizeEnd: 0,
        colorEnd: new THREE.Color(0xff0000),
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 10, spread),
        particlesPerSecond: .1,
        opacityStart: 0.5,
        opacityMiddle: 1,
        opacityEnd: 0.5
      });
    };

    Tree.prototype.generateOrnaments2 = function(y) {
      var colorStart, ornamentEmmiter, spread;
      spread = Math.max(0, 250 - y * 2.5);
      colorStart = new THREE.Color();
      colorStart.setRGB(0x8d1818);
      return ornamentEmmiter = new ShaderParticleEmitter({
        size: 200,
        sizeEnd: 0,
        colorEnd: new THREE.Color(0xff00ff),
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread * rnd(0.9, 1), 10, spread),
        particlesPerSecond: .1,
        opacityStart: 0.5,
        opacityMiddle: 1,
        opacityEnd: 0.5
      });
    };

    Tree.prototype.tick = function() {
      var _this = this;
      this.treeGroup.tick(this.treeTick);
      if (this.treeTick > 0.0) {
        this.treeTick -= .01;
      }
      this.ornamentGroup.tick(this.ornamentTick);
      return setTimeout(function() {
        return _this.ornamentGroup2.tick(_this.ornamentTick);
      }, 200);
    };

    return Tree;

  })();

}).call(this);
