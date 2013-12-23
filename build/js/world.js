(function() {
  var World, rnd,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.windowHalfX = window.innerWidth / 2;

  window.windowHalfY = window.innerHeight / 2;

  rnd = FW.rnd;

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var aMeshMirror, distance, i, position, waterNormals, _i,
        _this = this;
      FW.clock = new THREE.Clock();
      this.mlib = {};
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      this.camFar = 200000;
      this.width = 50000;
      this.height = 50000;
      this.rippleFactor = 2000;
      this.trees = [];
      FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, 400, 800);
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.maxDistance = 10000;
      this.controls.minDistance = 200;
      this.controls.maxPolarAngle = Math.PI / 4 + .7;
      FW.scene = new THREE.Scene();
      FW.Renderer = new THREE.WebGLRenderer();
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      document.body.appendChild(FW.Renderer.domElement);
      waterNormals = new THREE.ImageUtils.loadTexture('./assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.Renderer, FW.camera, FW.scene, {
        waterNormals: waterNormals,
        alpha: 1,
        waterColor: 0xffffff,
        sunColor: 0x5bced8,
        distortionScale: 100
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      FW.scene.add(aMeshMirror);
      this.meteor = new FW.Meteor();
      this.stars = new FW.Stars();
      for (i = _i = 1; _i <= 40; i = ++_i) {
        position = new THREE.Vector3(rnd(-5000, 5000), 0, rnd(-5000, 5000));
        distance = FW.camera.position.distanceTo(position);
        if (distance > 500) {
          this.trees.push(new FW.Tree(position));
        }
      }
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
      this.slowUpdate();
    }

    World.prototype.onWindowResize = function(event) {
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    World.prototype.animate = function() {
      var delta, time;
      requestAnimationFrame(this.animate);
      delta = FW.clock.getDelta();
      time = Date.now();
      this.water.material.uniforms.time.value += 1.0 / this.rippleFactor;
      this.controls.update();
      return this.render();
    };

    World.prototype.render = function() {
      var tree, _i, _len, _ref;
      this.meteor.tick();
      _ref = this.trees;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tree = _ref[_i];
        tree.tick();
      }
      this.water.render();
      return FW.Renderer.render(FW.scene, FW.camera);
    };

    World.prototype.slowUpdate = function() {
      var _this = this;
      return setTimeout(function() {
        _this.meteor.calcPositions();
        return _this.slowUpdate();
      }, this.slowUpdateInterval);
    };

    return World;

  })();

}).call(this);
