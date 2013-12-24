FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @ornamentMaxAge = 1
    @ornamentsMovingUp = true
    @position = pos
    @treeTick = 4
    @ornamentGroups = []
    @ornamentTick = .05
    @numLayers = 10
    @heightFactor = 25
    @squishFactor = 24
    @currentLightLayer   = 0
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
    @activateOrnamentLayer()



  
  
  ##########################################
  #TICK MAIN LOOOOP

  tick: ->
    if @treeTick > 0.0
      @treeGroup.tick(@treeTick)
      @treeTick -=.1
    if @treeTick < .0
      @treeTick = 0.0
    for ornamentGroup in @ornamentGroups
      ornamentGroup.tick(@ornamentTick)
    

  activateOrnamentLayer: ()->
    setTimeout(()=>
      if @ornamentsMovingUp
        if @currentLightLayer < @ornamentGroups.length
          @ornamentGroups[@currentLightLayer++].triggerPoolEmitter(1)
        #We've reached top of tree, now go back down
        else if @currentLightLayer is @ornamentGroups.length
          @ornamentsMovingUp = false
          @currentLightLayer--
      else if not @ornamentsMovingUp
        if @currentLightLayer >= 0
          @ornamentGroups[@currentLightLayer--].triggerPoolEmitter(1)
        # We've reached bottom of trees, now move back up
        else if @currentLightLayer < 0
          @ornamentsMovingUp = true 
          @currentLightLayer++
      @activateOrnamentLayer()
    100)


  createOrnamentGroup: (y, position)->
      ornamentGroup = new ShaderParticleGroup(
        texture: THREE.ImageUtils.loadTexture('assets/star.png')
        maxAge: @ornamentMaxAge
        blending: THREE.AdditiveBlending
      )

      ornamentGroup.addPool 2, @generateOrnaments(y), false
      @ornamentGroups.push ornamentGroup
      FW.scene.add ornamentGroup.mesh
      ornamentGroup.mesh.renderDepth = -1


  generateOrnaments: (y)->
    spread = Math.max 0, 250 - y * @squishFactor
    colorStart = new THREE.Color()
    colorStart.setRGB(Math.random(), Math.random(), Math.random())
    colorEnd = new THREE.Color()
    colorEnd.setRGB(Math.random(), Math.random(), Math.random())
    ornamentEmmiterSettings = new ShaderParticleEmitter
      size: 200
      sizeEnd: 20
      colorStart: colorStart
      colorEnd: colorEnd
      position: new THREE.Vector3 @position.x, y*@heightFactor, @position.z
      positionSpread: new THREE.Vector3 spread+5, 25, spread+ 5
      particlesPerSecond: 1500/y
      opacityStart: 1.0
      opacityMiddle: 1.0
      opacityEnd: 0.5
      alive: 0
      emitterDuration: 1

  generateTree: (y)->
    spread = Math.max 0, 250 - y* @squishFactor
    @treeEmitter = new ShaderParticleEmitter
      size: 200
      sizeEnd: 100
      position: new THREE.Vector3 @position.x,  y*@heightFactor, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread , 10, spread
      colorEnd: new THREE.Color()
      particlesPerSecond: 25.0/ (y)
      opacityEnd: 1.0





