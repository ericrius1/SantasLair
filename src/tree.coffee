FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @treeTick = 4
    @ornamentGroups = []
    @ornamentTick = .08
    @numLayers = 10
    @heightFactor = 25
    @squishFactor = 24
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/leaf2.png')
      maxAge: 10
      blending: THREE.NormalBlending
    });
    
    for y in [1..@numLayers]
      position = new THREE.Vector3 rnd(@position.x-10, @position.x+10), y*4,  @position.z
      @treeGroup.addEmitter @generateTree(y, position)
      @createOrnamentGroup(y)
    FW.scene.add(@treeGroup.mesh)


  generateTree: (y)->
    spread = Math.max 0, 250 - y* @squishFactor
    @treeEmitter = new ShaderParticleEmitter
      size: 200
      sizeEnd: 100
      position: new THREE.Vector3 @position.x,  y*@heightFactor, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread , 10, spread
      colorEnd: new THREE.Color()
      particlesPerSecond: 10.0
      opacityEnd: 1.0
  
  ##########################################
  #TICK MAIN LOOOOP

  tick: ->
    if @treeTick > 0.0
      @treeGroup.tick(@treeTick)
      @treeTick -=.1
    if @treeTick < 0
      @treeTick = 0
    
    for ornamentGroup in @ornamentGroups
      ornamentGroup.tick(@ornamentTick)


  createOrnamentGroup: (y, position)->
      ornamentGroup = new ShaderParticleGroup(
        texture: THREE.ImageUtils.loadTexture('assets/star.png')
        maxAge: 10
        blending: THREE.NormalBlending
      )

      ornamentGroup.addEmitter @generateOrnaments(y)
      @ornamentGroups.push ornamentGroup
      FW.scene.add ornamentGroup.mesh
      ornamentGroup.mesh.renderDepth = -1


  generateOrnaments: (y)->
    spread = Math.max 0, 250 - y * @squishFactor
    colorStart = new THREE.Color()
    colorStart.setRGB(Math.random(), Math.random(), Math.random())
    ornamentEmmiter = new ShaderParticleEmitter
      size: 200
      sizeEnd: 0
      sizeSpread: 100
      colorStart: new THREE.Color('white')
      colorEnd: colorStart
      position: new THREE.Vector3 @position.x, y*@heightFactor, @position.z
      positionSpread: new THREE.Vector3 spread+10, 10, spread+ 10
      particlesPerSecond: 5
      opacityStart: 1.0 
      opacityMiddle: 1.0
      opacityEnd: 1.0



