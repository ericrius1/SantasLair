FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos, scaleFactor)->
    #ORNAMENT STUFF
    @ornamentMaxAge = 4
    @lightSwitchingTimeout = 465
    @ornamentsMovingUp = true
    @ornamentGroups = []
    @ornamentTick = .04
    @ornamentHeightSpread = 20


    @position = pos
    @scaleFactor = scaleFactor
    @treeTick = .06
    @numLayers = 10
    @heightFactor = 25
    @squishFactor = 24
    @currentLightLayer   = 0
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/leaf2.png')
      maxAge: 5
      blending: THREE.NormalBlending
    });
    
    for curHeightLayer in [1..@numLayers]
      @treeGroup.addEmitter @generateTree(curHeightLayer)
      @createOrnamentGroup(curHeightLayer)
    @treeGroup.mesh.scale.set(@scaleFactor, @scaleFactor, @scaleFactor)
    FW.scene.add(@treeGroup.mesh)
    setTimeout(()=>
      @activateOrnamentLayer()
    1000)



  
  
  ##########################################
  #TICK MAIN LOOOOP

  tick: ->
    if @treeTick > 0.0
      @treeGroup.tick(@treeTick)
      @treeTick -=.0005
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
          @ornamentGroups[@currentLightLayer--].triggerPoolEmitter(1)
      else if not @ornamentsMovingUp
        if @currentLightLayer >= 0
          @ornamentGroups[@currentLightLayer--].triggerPoolEmitter(1)
        # We've reached bottom of trees, now move back up
        else if @currentLightLayer < 0
          @ornamentsMovingUp = true 
          @currentLightLayer++
          @ornamentGroups[@currentLightLayer++].triggerPoolEmitter(1)
      @activateOrnamentLayer()
    @lightSwitchingTimeout)


  createOrnamentGroup: (curHeightLayer)->
      ornamentGroup = new ShaderParticleGroup(
        texture: THREE.ImageUtils.loadTexture('assets/ornament.png')
        maxAge: @ornamentMaxAge
        blending: THREE.AdditiveBlending
      )

      ornamentGroup.addPool 2, @generateOrnaments(curHeightLayer), false
      @ornamentGroups.push ornamentGroup
      ornamentGroup.mesh.scale.set(@scaleFactor, @scaleFactor, @scaleFactor)
      FW.scene.add ornamentGroup.mesh
      ornamentGroup.mesh.renderDepth = -1


  generateOrnaments: (curHeightLayer)->
    spread = Math.max 0, 250 - (curHeightLayer * @squishFactor)
    colorStart = new THREE.Color()
    colorStart.setRGB(.4, 0, 0)
    ornamentEmmiterSettings = 
      size: 200 * @scaleFactor
      colorStart: colorStart
      colorSpread: new THREE.Vector3(.4, 0, .1)
      position: new THREE.Vector3 @position.x, curHeightLayer*@heightFactor, @position.z
      positionSpread: new THREE.Vector3 spread+1, @ornamentHeightSpread, spread+1
      particlesPerSecond: (200/curHeightLayer) * (@scaleFactor)
      opacityStart: 1.0
      opacityEnd: 1.0
      alive: 0
      emitterDuration: 1
    return ornamentEmmiterSettings

  generateTree: (curHeightLayer)->
    spread = Math.max 0, 250 - curHeightLayer* @squishFactor
    @treeEmitter = new ShaderParticleEmitter
      size: 200 * @scaleFactor
      sizeEnd: 100
      position: new THREE.Vector3 @position.x,  curHeightLayer*@heightFactor, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread , 20, spread
      colorEnd: new THREE.Color()
      particlesPerSecond: 40.0/ curHeightLayer * @scaleFactor
      opacityEnd: 1.0




