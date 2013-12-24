FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 70
    );

    @snowGroup.addEmitter @generateSnow()
    FW.scene.add(@snowGroup.mesh)
    @snowGroup.mesh.renderDepth = -2

  generateSnow: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB(1, 1, 1)
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 1000
      sizeEnd: 250
      position: new THREE.Vector3(0, FW.width * 0.7, 0)
      positionSpread: new THREE.Vector3(FW.width/2, 2000, FW.width/2)
      colorStart: colorStart
      colorEnd: colorStart
      velocity: new THREE.Vector3(0, -100, 0)
      acceleration: new THREE.Vector3(0, -0.00, 0)
      accelerationSpread: new THREE.Vector3(1, 0, 1)
      particlesPerSecond: 30
      opacityEnd: 0.6

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





