(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree() {
      var i, _i;
      this.cityGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 111
      });
      this.colorEnd = new THREE.Color();
      this.colorEnd.setRGB(Math.random(), Math.random(), Math.random());
      for (i = _i = 1; _i <= 1000; i = ++_i) {
        this.cityGroup.addPool(1, this.generateNode(), false);
      }
      FW.scene.add(this.cityGroup.mesh);
    }

    Tree.prototype.generateNode = function() {
      var cityEmitter, colorEnd, colorStart;
      colorStart = new THREE.Color();
      colorStart.setRGB(Math.random(), Math.random(), Math.random());
      colorEnd = new THREE.Color();
      colorEnd.setRGB(Math.random(), Math.random(), Math.random());
      return cityEmitter = new ShaderParticleEmitter({
        size: 100,
        colorStart: colorStart,
        colorEnd: colorEnd,
        alive: 0,
        particlesPerSecond: 1
      });
    };

    Tree.prototype.activate = function() {
      var x, z, _i, _results;
      _results = [];
      for (x = _i = 1; _i <= 10; x = ++_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (z = _j = 1; _j <= 10; z = ++_j) {
            _results1.push(this.cityGroup.triggerPoolEmitter(1, new THREE.Vector3(x * 100, 100, z * 100)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Tree.prototype.tick = function() {
      return this.cityGroup.tick(FW.globalTick);
    };

    return Tree;

  })();

}).call(this);
