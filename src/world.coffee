
window.windowHalfX = window.innerWidth / 2;
window.windowHalfY = window.innerHeight / 2;
rnd = FW.rnd
FW.World = class World
  constructor : ->
    @textureCounter = 0
    @animDelta = 0
    @animDeltaDir = 1
    @lightVal = .16
    @lightDir = 0
    FW.clock = new THREE.Clock()
    @updateNoise = true
    @animateTerrain = false
    @mlib = {}
    @MARGIN = 10
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200000
    @width = 150000
    @height = 150000
    @startingY = 40
    @rippleFactor = rnd(60, 300)
    @slowUpdateInterval = 1000
    @noLightCity = true
    @trees = []
    @midPointX = 10
    @midPointZ = 10
    @dougCounter = 0

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(55.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @startingY, 400
    FW.camera.lookAt new THREE.Vector3 0, 40, 0
    
    #CONTROLS
    @controls = new THREE.FlyControls(FW.camera)
    @controls.movementSpeed = 800;
    @controls.rollSpeed =  Math.PI / 4;
    if FW.development is true
      @controls.pitchEnabled = true
      @controls.flyEnabled = true
      # @controls.mouseMove = true
    

    # SCENE 
    FW.scene = new THREE.Scene()


    #DOUG
    @swirl = new FW.Swirl()
    
    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # LIGHTS
    directionalLight = new THREE.DirectionalLight 0xff0000, rnd(0.8, 1.5)
    randColor = Math.floor(Math.random()*16777215);
    console.log randColor
    directionalLight.color.setHex(randColor)
    directionalLight.position.set( 0, 6000, 0 )
    FW.scene.add( directionalLight )




    #WATER
    waterNormals = new THREE.ImageUtils.loadTexture './assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.Renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 0.98
      waterColor: 0xa7E8ff
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
    @SCREEN_HEIGHT = window.innerHeight - 2 * @MARGIN
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    requestAnimationFrame @animate
    delta = FW.clock.getDelta()
    time = Date.now()
    @water.material.uniforms.time.value += 1.0 / 60
    @controls.update(delta)
    @render()
  render : ->
    FW.camera.position.y = @startingY
    @meteor.tick()
    @stars.tick()
    # for tree in @trees
      # tree.tick()
    @water.render()
    @dougStuff()
    FW.Renderer.render( FW.scene, FW.camera );

  #For the things I don't want to run as often.. meteors, birds moving etc
  slowUpdate: ->
    setTimeout(=>
      @meteor.calcPositions()
      @slowUpdate()
    @slowUpdateInterval)

  dougStuff: ->
    setTimeout(=>
      num = 200
      @dougCounter++ 
      @swirl.tick()
      
      for i in [0..num]
        angle = (192 * Math.PI * (i/num)) + @dougCounter; 
        px = @midPointX + (Math.sin(angle) * Math.log(i) * (i))
        pz = @midPointZ + (Math.cos(angle) * Math.log(i) * (i))
        console.log "px",px
        console.log "pz",pz
        @point(px, pz, new THREE.Color(), 1)
      @dougStuff()
    
    200)

    





  point: (x, z, color, size)->
    @swirl.swirlGroup.triggerPoolEmitter 1, new THREE.Vector3(x, 100, z)

  





     


    
