(function() {
  var World, rnd,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  rnd = FW.rnd;

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var aMeshMirror, directionalLight, distanceToBigTree, distanceToCamera, i, position, waterNormals, _i, _ref,
        _this = this;
      FW.clock = new THREE.Clock();
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      this.camFar = 200000;
      FW.width = 10000;
      this.trees = [];
      this.numTrees = 20;
      this.rippleFactor = 2000;
      this.treeConstrainFactor = 5.0;
      FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, 800, 2000);
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.maxDistance = FW.width * 3;
      this.controls.minDistance = 1000;
      this.controls.maxPolarAngle = Math.PI / 4 + .7;
      FW.scene = new THREE.Scene();
      FW.Renderer = new THREE.WebGLRenderer();
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      document.body.appendChild(FW.Renderer.domElement);
      directionalLight = new THREE.DirectionalLight(0xabf2ff, 4);
      directionalLight.position.set(FW.width / 3, FW.width * 0.8, -FW.width / 3);
      FW.scene.add(directionalLight);
      directionalLight = new THREE.DirectionalLight(0xff00ff, 3);
      directionalLight.position.set(-FW.width / 3, FW.width * 0.8, FW.width / 3);
      FW.scene.add(directionalLight);
      this.setUpTerrain();
      waterNormals = new THREE.ImageUtils.loadTexture('./assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.Renderer, FW.camera, FW.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        waterColor: 0xffffff,
        sunColor: 0x0ecce3,
        distortionScale: 50
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.width, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      FW.scene.add(aMeshMirror);
      this.meteor = new FW.Meteor();
      this.stars = new FW.Stars();
      this.snow = new FW.Snow();
      this.trees.push(new FW.Tree(new THREE.Vector3(), 3));
      for (i = _i = 1, _ref = this.numTrees; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        position = new THREE.Vector3(rnd(-FW.width / this.treeConstrainFactor, FW.width / this.treeConstrainFactor), 0, rnd(-FW.width / this.treeConstrainFactor, FW.width / this.treeConstrainFactor));
        distanceToCamera = FW.camera.position.distanceTo(position);
        distanceToBigTree = position.distanceTo(new THREE.Vector3());
        if (distanceToCamera > 100 && distanceToBigTree > 1111) {
          this.trees.push(new FW.Tree(position, rnd(1, 2)));
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
      this.water.material.uniforms.time.value += 1.0 / this.rippleFactor;
      time = Date.now();
      this.controls.update();
      return this.render();
    };

    World.prototype.render = function() {
      var tree, _i, _len, _ref;
      this.meteor.tick();
      this.snow.tick();
      this.stars.tick();
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

    World.prototype.setUpTerrain = function() {
      var terrain;
      this.terrainWidth = 4000;
      this.terrainHeight = 2000;
      terrain = this.loadTerrain(new THREE.Vector3(-FW.width / 2 + this.terrainWidth / 2, -100, -FW.width / 2 + this.terrainHeight / 1.3));
      return terrain.rotation.y = .5;
    };

    World.prototype.loadTerrain = function(position) {
      var parameters, terrain, terrainGeo, terrainMaterial;
      parameters = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: this.terrainWidth,
        height: this.terrainHeight,
        widthSegments: 100,
        heightSegments: 100,
        depth: 3000,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      terrainGeo = TERRAINGEN.Get(parameters);
      terrainMaterial = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
      });
      terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
      terrain.position = position;
      FW.scene.add(terrain);
      return terrain;
    };

    return World;

  })();

}).call(this);
