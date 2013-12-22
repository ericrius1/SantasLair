FW.Tree = class Tree
  rnd = FW.rnd
  constructor: ()->

    @cityGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 111
    });

    @colorEnd = new THREE.Color()
    @colorEnd.setRGB(Math.random(),Math.random(),Math.random() )
    for i in [1..1000]
      @cityGroup.addPool 1, @generateNode(), false
    FW.scene.add(@cityGroup.mesh)

  generateNode: ->
    colorStart = new THREE.Color()
    colorStart.setRGB Math.random(), Math.random(), Math.random()
    colorEnd = new THREE.Color()
    colorEnd.setRGB Math.random(), Math.random(), Math.random()
    cityEmitter = new ShaderParticleEmitter
      size: 100
      colorStart: colorStart
      colorEnd: colorEnd
      alive: 0
      particlesPerSecond: 1

  activate: ->
    for x in [1..10]
      for z in [1..10]
        @cityGroup.triggerPoolEmitter(1, new THREE.Vector3 x * 100, 100, z * 100)
   
  
    
  tick: ->
    @cityGroup.tick(FW.globalTick)
    


