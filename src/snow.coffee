FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/star.png')
      maxAge: 100
    );

    @snowGroup.addEmitter @generateSnow()
    FW.scene.add(@snowGroup.mesh)

  generateSnow: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB(1, .5, 1)
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 1000
      position: new THREE.Vector3()
      positionSpread: new THREE.Vector3(100, 0, 100)
      colorStart: colorStart
      velocity: new THREE.Vector3(0, 5, 0)
      acceleration: new THREE.Vector3(0, 4.8, 0)
      accelerationSpread: new THREE.Vector3(0, .03, 0)
      particlesPerSecond: 1

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





