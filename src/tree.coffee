FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @treeTick = 0.16
    @numLayers = 100
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/leaf.png')
      maxAge: 100
      blending: THREE.NormalBlending
    });

    @ornamentGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 10
      blending: THREE.NormalBlending
    });
    
    for y in [1..@numLayers]
      position = new THREE.Vector3 rnd(@position.x-10, @position.x+10), y*4,  @position.z
      @treeGroup.addEmitter @generateTree(y, position)
      # @ornamentGroup.addEmitter @generateOrnaments(y)
    FW.scene.add(@treeGroup.mesh)

  generateTree: (y)->
    spread = Math.max 0, 250 - y* 2.5
    treeEmitter = new ShaderParticleEmitter
      size: 200
      sizeSpread: 50
      position: new THREE.Vector3 @position.x,  y*4, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1) , 0, spread * rnd(0.9, 1)
      particlesPerSecond: 15/y
      opacityStart: 1.0
      opacityMiddle: 1.0
      opacityEnd: 1.0
  
  generateOrnaments: (y)->
    spread = 250 - y*5
    ornamentEmmiter = new ShaderParticleEmitter
      size: 100
      sizeSpread: 50



  
    
  tick: ->
    # @treeGroup.tick(FW.globalTick/2)
    @treeGroup.tick(@treeTick)
    if @treeTick > 0.0
      @treeTick -=.0001
    


