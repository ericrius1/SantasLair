
rnd = FW.rnd
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200000
    FW.width = 10000
  
    @trees = []
    @numTrees = 5
    @treeConstrainFactor = 6.0


    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, 600, 2200
    
    #CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    @controls.maxDistance = FW.width * 3
    @controls.minDistance = 1000
    @controls.zoomSpeed = 0.3
    @controls.rotateSpeed = 0.3
    @controls.maxPolarAngle = Math.PI/4 + .7
    

    # SCENE 
    FW.scene = new THREE.Scene()


    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    #LIGHTS
    directionalLight = new THREE.DirectionalLight 0xabf2ff, 2
    directionalLight.position.set( FW.width/3, FW.width * 0.8, -FW.width/3 )
    FW.scene.add( directionalLight )
    directionalLight = new THREE.DirectionalLight 0xff00ff, 1
    directionalLight.position.set( -FW.width/3, FW.width * 0.8, FW.width/3 )
    FW.scene.add( directionalLight )


    #TERRAIN
    @setUpTerrain()

    #WATER
    waterNormals = new THREE.ImageUtils.loadTexture './assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.Renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 0.95
      waterColor: 0xffffff
      sunColor: 0x0ecce3  
      distortionScale: 20

    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry FW.width, FW.width, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror

        
    # FUN
    @meteor = new FW.Meteor()
    @stars = new FW.Stars()
    @snow = new FW.Snow()


    # TREES
    for i in [1..@numTrees]
      position = new THREE.Vector3(rnd(-FW.width/@treeConstrainFactor, FW.width/@treeConstrainFactor), 0, rnd(-FW.width/@treeConstrainFactor, FW.width/@treeConstrainFactor))
      #keep trees from getting too close to camera or Big tree
      distanceToCamera = FW.camera.position.distanceTo(position)
      distanceToBigTree = position.distanceTo(new THREE.Vector3())
      if(distanceToCamera > 100 and distanceToBigTree > 1111)
        @trees.push new FW.Tree position, rnd(1, 2)
    @trees.push new FW.Tree(new THREE.Vector3(), 3)



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
    @controls.update()
    @render()
  render : ->
    @meteor.tick()
    @snow.tick()
    @stars.tick()

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


  setUpTerrain: ()->
    @terrainWidth = 4000
    @terrainHeight = 2000
    terrain = @loadTerrain new THREE.Vector3(-FW.width/2 + @terrainWidth/2 , -100, -FW.width/2 + @terrainHeight/1.3)
    terrain.rotation.y = .5
    terrain = @loadTerrain new THREE.Vector3(FW.width/2 - @terrainWidth/2, -100, -FW.width/2 + @terrainHeight/1.3)
  loadTerrain: (position)->
    parameters = 
      alea: RAND_MT,
      generator: PN_GENERATOR,
      width: @terrainWidth
      height: @terrainHeight
      widthSegments: 200
      heightSegments: 200
      depth: rnd(1000, 2500)
      param: 6,
      filterparam: 1
      filter: [ CIRCLE_FILTER ]
      postgen: [ MOUNTAINS_COLORS ]
      effect: [ DESTRUCTURE_EFFECT ]

    terrainGeo = TERRAINGEN.Get(parameters)
    terrainMaterial = new THREE.MeshPhongMaterial vertexColors: THREE.VertexColors, shading: THREE.FlatShading, side: THREE.DoubleSide 
    terrain = new THREE.Mesh terrainGeo, terrainMaterial
    terrain.position = position
    FW.scene.add terrain
    return terrain

