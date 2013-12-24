
window.windowHalfX = window.innerWidth / 2;
window.windowHalfY = window.innerHeight / 2;
rnd = FW.rnd
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @mlib = {}
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200000
    FW.width = 10000
    FW.height = 10000
    @trees = []
    @numTrees = 10
    @rippleFactor = 2000


    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, 400, 800
    
    #CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    # @controls.maxDistance = 5500
    # @controls.minDistance = 500
    @controls.maxPolarAngle = Math.PI/4 + .7
    

    # SCENE 
    FW.scene = new THREE.Scene()
    FW.scene.fog = new THREE.FogExp2( 0xefd1b5, 1.25 );


    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer(antialias: true)
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT

    document.body.appendChild FW.Renderer.domElement


    #WATER
    waterNormals = new THREE.ImageUtils.loadTexture './assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.Renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 0.99
      waterColor: 0xffffff
      sunColor: 0x0ecce3  
      distortionScale: 100

    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry FW.width, FW.height, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror

        
    #FUN
    @meteor = new FW.Meteor()
    @stars = new FW.Stars()
    @snow = new FW.Snow()

    # TREES
    @trees.push new FW.Tree(new THREE.Vector3(), 10)
    for i in [1..@numTrees]
      position = new THREE.Vector3(rnd(-FW.width/2.2, FW.width/2.2), 0, rnd(-FW.height/2.2, FW.height/2.2))
      distance = FW.camera.position.distanceTo(position)
      if(distance > 100)
        @trees.push new FW.Tree position



    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

    @slowUpdate()

  
  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    requestAnimationFrame @animate
    delta = FW.clock.getDelta()
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    time = Date.now()
    @controls.update()
    @render()
  render : ->
    @meteor.tick()
    @snow.tick()
    # @stars.tick()
    for tree in @trees
      tree.tick()
    @water.render()
    FW.Renderer.render( FW.scene, FW.camera );

  #For the things I don't want to run as often.. meteors, birds moving etc
  slowUpdate: ->
    setTimeout(=>
      @meteor.calcPositions()
      @slowUpdate()
    @slowUpdateInterval)

