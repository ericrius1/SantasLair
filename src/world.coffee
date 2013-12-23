
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
    @width = 50000
    @height = 50000
    @rippleFactor = 4000
    @trees = []


    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @startingY, 400
    FW.camera.lookAt new THREE.Vector3 0, 40, 0
    
    #CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    @controls.maxDistance = 10000
    @controls.minDistance = 200
    @controls.maxPolarAngle = Math.PI/4 + .7
    

    # SCENE 
    FW.scene = new THREE.Scene()


    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement


    #WATER
    waterNormals = new THREE.ImageUtils.loadTexture './assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.Renderer, FW.camera, FW.scene,
      waterNormals: waterNormals
      alpha: 1
      waterColor: 0xffffff
      distortionScale: 50

    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry @width, @height, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror

        
    #FUN
    @meteor = new FW.Meteor()
    @stars = new FW.Stars()
    for i in [1..40]
      @trees.push new FW.Tree(new THREE.Vector3(rnd(-2000, 2000), 0, rnd(-2000, 2000)))




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
    time = Date.now()
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    @controls.update()
    @render()
  render : ->
    @meteor.tick()
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

