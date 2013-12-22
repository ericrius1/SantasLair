(function() {
  var World, rnd,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.windowHalfX = window.innerWidth / 2;

  window.windowHalfY = window.innerHeight / 2;

  rnd = FW.rnd;

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var aMeshMirror, directionalLight, i, randColor, waterNormals, _i,
        _this = this;
      this.textureCounter = 0;
      this.animDelta = 0;
      this.animDeltaDir = 1;
      this.lightVal = .16;
      this.lightDir = 0;
      FW.clock = new THREE.Clock();
      this.updateNoise = true;
      this.animateTerrain = false;
      this.mlib = {};
      this.MARGIN = 10;
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      this.camFar = 200000;
      this.width = 150000;
      this.height = 150000;
      this.startingY = 40;
      this.rippleFactor = rnd(60, 300);
      this.slowUpdateInterval = 1000;
      this.noLightCity = true;
      this.trees = [];
      this.midPointX = 10;
      this.midPointZ = 10;
      this.dougCounter = 0;
      FW.camera = new THREE.PerspectiveCamera(55.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.startingY, 400);
      FW.camera.lookAt(new THREE.Vector3(0, 40, 0));
      this.controls = new THREE.FlyControls(FW.camera);
      this.controls.movementSpeed = 800;
      this.controls.rollSpeed = Math.PI / 4;
      if (FW.development === true) {
        this.controls.pitchEnabled = true;
        this.controls.flyEnabled = true;
      }
      FW.scene = new THREE.Scene();
      this.swirl = new FW.Swirl();
      FW.Renderer = new THREE.WebGLRenderer();
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      document.body.appendChild(FW.Renderer.domElement);
      directionalLight = new THREE.DirectionalLight(0xff0000, rnd(0.8, 1.5));
      randColor = Math.floor(Math.random() * 16777215);
      console.log(randColor);
      directionalLight.color.setHex(randColor);
      directionalLight.position.set(0, 6000, 0);
      FW.scene.add(directionalLight);
      waterNormals = new THREE.ImageUtils.loadTexture('./assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.Renderer, FW.camera, FW.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 0.98,
        waterColor: 0xa7E8ff,
        distortionScale: 50
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      FW.scene.add(aMeshMirror);
      this.meteor = new FW.Meteor();
      this.stars = new FW.Stars();
      for (i = _i = 1; _i <= 40; i = ++_i) {
        this.trees.push(new FW.Tree(new THREE.Vector3(rnd(-2000, 2000), 0, rnd(-2000, 2000))));
      }
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
      this.slowUpdate();
    }

    World.prototype.onWindowResize = function(event) {
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight - 2 * this.MARGIN;
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    World.prototype.animate = function() {
      var delta, time;
      requestAnimationFrame(this.animate);
      delta = FW.clock.getDelta();
      time = Date.now();
      this.water.material.uniforms.time.value += 1.0 / 60;
      this.controls.update(delta);
      return this.render();
    };

    World.prototype.render = function() {
      FW.camera.position.y = this.startingY;
      this.meteor.tick();
      this.stars.tick();
      this.water.render();
      this.dougStuff();
      return FW.Renderer.render(FW.scene, FW.camera);
    };

    World.prototype.slowUpdate = function() {
      var _this = this;
      return setTimeout(function() {
        _this.meteor.calcPositions();
        return _this.slowUpdate();
      }, this.slowUpdateInterval);
    };

    World.prototype.dougStuff = function() {
      var _this = this;
      return setTimeout(function() {
        var angle, i, num, px, pz, _i;
        num = 200;
        _this.dougCounter++;
        _this.swirl.tick();
        for (i = _i = 0; 0 <= num ? _i <= num : _i >= num; i = 0 <= num ? ++_i : --_i) {
          angle = (192 * Math.PI * (i / num)) + _this.dougCounter;
          px = _this.midPointX + (Math.sin(angle) * Math.log(i) * i);
          pz = _this.midPointZ + (Math.cos(angle) * Math.log(i) * i);
          console.log("px", px);
          console.log("pz", pz);
          _this.point(px, pz, new THREE.Color(), 1);
        }
        return _this.dougStuff();
      }, 200);
    };

    World.prototype.point = function(x, z, color, size) {
      return this.swirl.swirlGroup.triggerPoolEmitter(1, new THREE.Vector3(x, 100, z));
    };

    return World;

  })();

}).call(this);
