FW.Laser = class Laser
  rnd = FW.rnd
  constructor: (pos)->
    @position = pos
    @laserGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 100
    });

    @laserGroup.addPool 1, @generateLaser(), false
    FW.scene.add(@laserGroup.mesh)

  generateLaser: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB(1, .5, 1)
    laserEmitterSettings = 
      size: 200
      acceleration: new THREE.Vector3(0, -.1, 0)
      colorStart: colorStart
      #As we go higher, we want spread less to give xmas tree pyramid shape
      particlesPerSecond: 10
      alive: 0

  
  activate: ->
    @laserGroup.triggerPoolEmitter 0, new THREE.Vector3(10, 100, 0)  
  tick: ->
    @laserGroup.tick(FW.globalTick)





