FW.Tree = class Tree
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @treeGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 100
    });

    @colorEnd = new THREE.Color()
    @colorEnd.setRGB(Math.random(),Math.random(),Math.random() )
    height = rnd(30, 60)
    for y in [1..height]
      @treeGroup.addEmitter @generateNode(y)
    FW.scene.add(@treeGroup.mesh)

  generateNode: (y)->
    colorStart = new THREE.Color()
    colorStart.setRGB .2, y/50, .2
    colorEnd = new THREE.Color()
    colorEnd.setRGB .3, y/50, .3
    spread = 250 - y*5
    cityEmitter = new ShaderParticleEmitter
      size: 50
      sizeSpread: 20
      position: new THREE.Vector3 @position.x,  y*4, @position.z
      #As we go higher, we want spread less to give xmas tree pyramid shape
      positionSpread: new THREE.Vector3 spread * rnd(0.9, 1) , 0, spread * rnd(0.9, 1)
      colorStart: colorStart
      colorSpread: new THREE.Vector3 1 ,1,1
      colorEnd: colorEnd
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
    


