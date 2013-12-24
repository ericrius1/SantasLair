(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos, scaleFactor) {
      var curHeightLayer, _i, _ref,
        _this = this;
      this.ornamentMaxAge = .5;
      this.ornamentsMovingUp = true;
      this.position = pos;
      this.scaleFactor = scaleFactor;
      this.treeTick = 2;
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
      for (curHeightLayer = _i = 1, _ref = this.numLayers; 1 <= _ref ? _i <= _ref : _i >= _ref; curHeightLayer = 1 <= _ref ? ++_i : --_i) {
        this.treeGroup.addEmitter(this.generateTree(curHeightLayer));
        this.createOrnamentGroup(curHeightLayer);
      }
      this.treeGroup.mesh.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      FW.scene.add(this.treeGroup.mesh);
      setTimeout(function() {
        return _this.activateOrnamentLayer();
      }, rnd(1000, 5000));
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
      }, 50);
    };

    Tree.prototype.createOrnamentGroup = function(curHeightLayer) {
      var ornamentGroup;
      ornamentGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: this.ornamentMaxAge,
        blending: THREE.AdditiveBlending
      });
      ornamentGroup.addPool(2, this.generateOrnaments(curHeightLayer), false);
      this.ornamentGroups.push(ornamentGroup);
      ornamentGroup.mesh.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      FW.scene.add(ornamentGroup.mesh);
      return ornamentGroup.mesh.renderDepth = -1;
    };

    Tree.prototype.generateOrnaments = function(curHeightLayer) {
      var colorStart, ornamentEmmiterSettings, spread;
      spread = Math.max(0, 250 - (curHeightLayer * this.squishFactor));
      colorStart = new THREE.Color();
      colorStart.setRGB(Math.random(), Math.random(), Math.random());
      ornamentEmmiterSettings = {
        size: 200 * this.scaleFactor,
        sizeSpread: 200,
        sizeEnd: 20,
        colorStart: colorStart,
        colorSpread: new THREE.Vector3(0.2, 0.2, 0.2),
        colorEnd: colorStart,
        position: new THREE.Vector3(this.position.x, curHeightLayer * this.heightFactor, this.position.z),
        positionSpread: new THREE.Vector3(spread + 5, 0, spread + 5),
        particlesPerSecond: (100 / curHeightLayer) * this.scaleFactor,
        opacityStart: 1.0,
        opacityMiddle: 1.0,
        opacityEnd: 1.0,
        alive: 0,
        emitterDuration: 1
      };
      return ornamentEmmiterSettings;
    };

    Tree.prototype.generateTree = function(curHeightLayer) {
      var spread;
      spread = Math.max(0, 250 - curHeightLayer * this.squishFactor);
      return this.treeEmitter = new ShaderParticleEmitter({
        size: 200 * this.scaleFactor,
        sizeEnd: 100,
        position: new THREE.Vector3(this.position.x, curHeightLayer * this.heightFactor, this.position.z),
        positionSpread: new THREE.Vector3(spread, 10, spread),
        colorEnd: new THREE.Color(),
        particlesPerSecond: 25.0 / curHeightLayer,
        opacityEnd: 1.0
      });
    };

    return Tree;

  })();

}).call(this);
