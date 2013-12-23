FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @treeTick = 2
    @ornamentTick = .16
    @numLayers = 100
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/leaf2.png')
      maxAge: 100
      blending: THREE.NormalBlending
    });

    @ornamentGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 10
      blending: THREE.NormalBlending
    });

    @ornamentGroup2 = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 10
      blending: THREE.NormalBlending
    });
    
    for y in [1..@numLayers]
      position = new THREE.Vector3 rnd(@position.x-10, @position.x+10), y*4,  @position.z
      @treeGroup.addEmitter @generateTree(y, position)
      @ornamentGroup.addEmitter @generateOrnaments(y)
      @ornamentGroup2.addEmitter @generateOrnaments2(y)
    FW.scene.add(@treeGroup.mesh)
    FW.scene.add(@ornamentGroup.mesh)
    FW.scene.add(@ornamentGroup2.mesh)

  generateTree: (y)->
    spread = Math.max 0, 250 - y* 2.5
    treeEmitter = new ShaderParticleEmitter
      size: 150
      position: new THREE.Vector3 @position.x,  y*4, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1) , 10, spread * rnd(0.9, 1)
      colorEnd: new THREE.Color()
      particlesPerSecond: 10/y
      opacityEnd: 1.0
  
  generateOrnaments: (y)->
    spread = Math.max 0, 250 - y * 2.5
    colorStart = new THREE.Color()
    colorStart.setRGB(0x8d1818)
    ornamentEmmiter = new ShaderParticleEmitter
      size: 200
      sizeEnd: 0
      colorEnd: new THREE.Color(0xff0000)
      position: new THREE.Vector3 @position.x, y*4, @position.z
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1), 10, spread
      particlesPerSecond: .1
      opacityStart: 0.5
      opacityMiddle: 1
      opacityEnd: 0.5


  generateOrnaments2: (y)->
    spread = Math.max 0, 250 - y * 2.5
    colorStart = new THREE.Color()
    colorStart.setRGB(0x8d1818)
    ornamentEmmiter = new ShaderParticleEmitter
      size: 200
      sizeEnd: 0
      colorEnd: new THREE.Color(0xff00ff)
      position: new THREE.Vector3 @position.x, y*4, @position.z
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1), 10, spread
      particlesPerSecond: .1
      opacityStart: 0.5
      opacityMiddle: 1
      opacityEnd: 0.5


  
    
  tick: ->
    # @treeGroup.tick(FW.globalTick/2)
    @treeGroup.tick(@treeTick)
    if @treeTick > 0.0
      @treeTick -=.01 
    
    @ornamentGroup.tick @ornamentTick
    setTimeout(()=>
      @ornamentGroup2.tick @ornamentTick
    200)



