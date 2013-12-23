FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 100
    });

    height = rnd(30, 60)
    for y in [1..50]
      @treeGroup.addEmitter @generateNode(y)
    FW.scene.add(@treeGroup.mesh)

  generateNode: (y)->
    colorStart = new THREE.Color()
    colorStart.setRGB .067, 0.17, .035
    colorEnd = new THREE.Color()
    colorEnd.setRGB .067, 0.17, .078
    spread = 250 - y*5
    cityEmitter = new ShaderParticleEmitter
      size: 50
      sizeSpread: 50
      position: new THREE.Vector3 rnd(@position.x-10, @position.x+10),  y*4, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1) , 0, spread * rnd(0.9, 1)
      colorStart: colorStart
      colorEnd: colorStart
      particlesPerSecond: 10/y
      opacityEnd: 1

  # activate: ->
  #   for i in [0..10]
  #     end = 10 - i
  #     for x in [i..end]
  #       for z in [i..end]
  #         @treeGroup.triggerPoolEmitter(1, new THREE.Vector3 x * 100, 100 * i, z * 100)
     
  
    
  tick: ->
    @treeGroup.tick(FW.globalTick)
    


