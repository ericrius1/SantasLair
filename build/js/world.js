(function() {
  var World, rnd,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.windowHalfX = window.innerWidth / 2;

  window.windowHalfY = window.innerHeight / 2;

  rnd = FW.rnd;

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var aMeshMirror, directionalLight, randColor, waterNormals,
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
      FW.camera = new THREE.PerspectiveCamera(55.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.startingY, 400);
      FW.camera.lookAt(new THREE.Vector3(0, 40, 0));
      this.controls = new THREE.FlyControls(FW.camera);
      this.controls.movementSpeed = 800;
      this.controls.rollSpeed = Math.PI / 8;
      if (FW.development === true) {
        this.controls.pitchEnabled = true;
        this.controls.flyEnabled = true;
      }
      FW.scene = new THREE.Scene();
      FW.Renderer = new THREE.WebGLRenderer();
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      document.body.appendChild(FW.Renderer.domElement);
      this.meteor = new FW.Meteor();
      this.stars = new FW.Stars();
      this.tree = new FW.Tree();
      directionalLight = new THREE.DirectionalLight(0xff0000, rnd(0.8, 1.5));
      randColor = Math.floor(Math.random() * 16777215);
      console.log(randColor);
      directionalLight.color.setHex(randColor);
      directionalLight.position.set(0, 6000, 0);
      FW.scene.add(directionalLight);
      FW.scene.add(this.screen);
      waterNormals = new THREE.ImageUtils.loadTexture('./assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.Renderer, FW.camera, FW.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 0.99,
        waterColor: 0x001e0f,
        distortionScale: 50
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      FW.scene.add(aMeshMirror);
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
      this.tree.tick();
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
