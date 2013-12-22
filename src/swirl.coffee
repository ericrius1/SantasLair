FW.Swirl = class Swirl
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @swirlGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 2
    });

    for i in [1..50000]
      @swirlGroup.addPool 1, @generateNode(), false
    FW.scene.add(@swirlGroup.mesh)

  generateNode: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB .2, .2, .2
    colorEnd = new THREE.Color()
    swirlEmitterSettings = 
      size: 20
      #As we go higher, we want spread less to give xmas tree pyramid shape
      particlesPerSecond: 1
      alive: 0
      emitterDuration: 1

         
  tick: ->
    @swirlGroup.tick(FW.globalTick)
    


