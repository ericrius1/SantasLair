(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var position, y, _i, _ref;
      this.curOrnColor = {
        r: rnd(0, .5),
        g: rnd(0, 0.5),
        b: rnd(0, 0.5)
      };
      this.ornamentMaxAge = 1;
      this.ornamentsMovingUp = true;
      this.position = pos;
      this.treeTick = 4;
      this.ornamentGroups = [];
      this.ornamentTick = .05;
      this.numLayers = 10;
      this.heightFactor = 25;
      this.squishFactor = 24;
      this.currentLightLayer = 0;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/leaf2.png'),
        maxAge: 10,
        blending: THREE.NormalBlending
      });
      for (y = _i = 1, _ref = this.numLayers; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
        position = new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z);
        this.treeGroup.addEmitter(this.generateTree(y, position));
        this.createOrnamentGroup(y);
      }
      FW.scene.add(this.treeGroup.mesh);
      this.activateOrnamentLayer();
    }

    Tree.prototype.tick = function() {
      var ornamentGroup, _i, _len, _ref, _results;
      if (this.treeTick > 0.0) {
        this.treeGroup.tick(this.treeTick);
        this.treeTick -= .1;
      }
      if (this.treeTick < .0) {
        this.treeTick = 0.0;
      }
      _ref = this.ornamentGroups;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ornamentGroup = _ref[_i];
        _results.push(ornamentGroup.tick(this.ornamentTick));
      }
      return _results;
    };

    Tree.prototype.activateOrnamentLayer = function() {
      var _this = this;
      return setTimeout(function() {
        if (_this.ornamentsMovingUp) {
          if (_this.currentLightLayer < _this.ornamentGroups.length) {
            _this.ornamentGroups[_this.currentLightLayer++].triggerPoolEmitter(1);
          } else if (_this.currentLightLayer === _this.ornamentGroups.length) {
            _this.ornamentsMovingUp = false;
            _this.currentLightLayer--;
          }
        } else if (!_this.ornamentsMovingUp) {
          if (_this.currentLightLayer >= 0) {
            _this.ornamentGroups[_this.currentLightLayer--].triggerPoolEmitter(1);
          } else if (_this.currentLightLayer < 0) {
            _this.ornamentsMovingUp = true;
            _this.currentLightLayer++;
          }
        }
        return _this.activateOrnamentLayer();
      }, rnd(50, 200));
    };

    Tree.prototype.createOrnamentGroup = function(y, position) {
      var ornamentGroup;
      ornamentGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: this.ornamentMaxAge,
        blending: THREE.AdditiveBlending
      });
      ornamentGroup.addPool(2, this.generateOrnaments(y), false);
      this.ornamentGroups.push(ornamentGroup);
      FW.scene.add(ornamentGroup.mesh);
      return ornamentGroup.mesh.renderDepth = -1;
    };

    Tree.prototype.generateOrnaments = function(y) {
      var colorStart, ornamentEmmiterSettings, spread;
      spread = Math.max(0, 250 - y * this.squishFactor);
      colorStart = new THREE.Color().copy(this.curOrnColor);
      console.log(colorStart);
      ornamentEmmiterSettings = {
        size: 200,
        sizeSpread: 200,
        sizeEnd: 20,
        colorStart: colorStart,
        colorEnd: colorStart,
        position: new THREE.Vector3(this.position.x, y * this.heightFactor, this.position.z),
        positionSpread: new THREE.Vector3(spread + 5, 25, spread + 5),
        particlesPerSecond: 300 / y,
        opacityStart: 1.0,
        opacityMiddle: 1.0,
        opacityEnd: 0.5,
        alive: 0,
        emitterDuration: 1
      };
      this.nextColor();
      return ornamentEmmiterSettings;
    };

    Tree.prototype.generateTree = function(y) {
      var spread;
      spread = Math.max(0, 250 - y * this.squishFactor);
      return this.treeEmitter = new ShaderParticleEmitter({
        size: 200,
        sizeEnd: 100,
        position: new THREE.Vector3(this.position.x, y * this.heightFactor, this.position.z),
        positionSpread: new THREE.Vector3(spread, 10, spread),
        colorEnd: new THREE.Color(),
        particlesPerSecond: 25.0 / y,
        opacityEnd: 1.0
      });
    };

    Tree.prototype.nextColor = function() {
      return this.curOrnColor.r = Math.min(this.curOrnColor.r + .05, 1);
    };

    return Tree;

  })();

}).call(this);
